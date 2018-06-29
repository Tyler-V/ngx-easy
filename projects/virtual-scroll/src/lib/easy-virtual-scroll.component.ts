import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  HostBinding,
  NgZone,
} from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ScrollIndex, ScrollEvent, ScrollType } from './types';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'ez-virtual-scroll',
  templateUrl: './easy-virtual-scroll.component.html',
  styleUrls: ['./easy-virtual-scroll.component.scss']
})
export class EasyVirtualScrollComponent implements OnInit, OnChanges, OnDestroy {

  @HostBinding('class') class = 'ez-virtual-scroll';

  @Input() size: number;
  @Input() rowHeight: number;
  @Input() buffer: number;
  @Input() debounceTime: number;

  @Output() scroll: EventEmitter<ScrollEvent> = new EventEmitter<ScrollEvent>();

  @ViewChild('transit') transit: ElementRef;
  @ViewChild('scroll') scrollElementRef: ElementRef;
  @ViewChild('content') contentElementRef: ElementRef;

  public index: ScrollIndex;
  public previousIndex: ScrollIndex;
  public visible: ScrollIndex;
  public rows: number;
  public topPadding: number;

  private yScrollSubscription$: Subscription;

  constructor(
    private _ngZone: NgZone,
    private _elementRef: ElementRef,
  ) { }

  ngOnInit() {
    this._ngZone.runOutsideAngular(() => {
      const scrollSubscription$: Observable<Event> = fromEvent(this._elementRef.nativeElement, 'scroll');
      if (this.debounceTime) {
        this.yScrollSubscription$ = scrollSubscription$
          .pipe(debounceTime(this.debounceTime))
          .subscribe(() => this.refresh());
      } else {
        this.yScrollSubscription$ = scrollSubscription$
          .subscribe(() => this.refresh());
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.previousIndex = undefined;
    this.refresh();
  }

  ngOnDestroy() {
    this.yScrollSubscription$.unsubscribe();
  }

  /**
   * Gets the current Index of items that should be displayed based on the scroll position.
   */
  private getIndex(): ScrollIndex {
    const el = this._elementRef.nativeElement;
    const scrollHeight = this.rowHeight * this.size;
    const scrollTop = Math.max(0, Math.min(el.scrollTop, scrollHeight));
    const start = Math.max(0, Math.floor(scrollTop / scrollHeight * this.size));
    const end = Math.min(this.size, Math.ceil(scrollTop / scrollHeight * this.size) + Math.ceil(el.clientHeight / this.rowHeight));
    return {
      start: start,
      end: end
    };
  }

  /**
   * @returns: Whether the grid is getting close to the start or end of the currently displayed content.
   */
  private shouldUpdate(index: ScrollIndex) {
    return !this.index || ((Math.max(0, (index.start - this.rows)) < this.index.start)
      || (Math.min(this.size, (index.end + this.rows)) > this.index.end));
  }

  public refresh() {
    requestAnimationFrame(() => {
      const index = this.getIndex();
      if (!this.shouldUpdate(index)) {
        return;
      }

      this.rows = index.end - index.start;

      if (this.buffer == null) {
        this.buffer = this.rows * 1;
      }

      this.topPadding = Math.max(0, ((this.rowHeight * index.start) - (this.rowHeight * this.buffer)));
      index.start = Math.max(0, (index.start - this.buffer));
      index.end = Math.min(this.size, (index.end + this.buffer));

      if (this.previousIndex === undefined || index.start !== this.previousIndex.start || index.end !== this.previousIndex.end) {
        if (!isNaN(index.start) && !isNaN(index.end)) {
          this._ngZone.run(() => {
            this.index = this.previousIndex = index;
            this.scroll.emit({
              type: ScrollType.Vertical,
              index: index
            });
          });
        }
      }
    });
  }
}
