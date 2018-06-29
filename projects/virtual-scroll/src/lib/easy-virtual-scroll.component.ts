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
  HostBinding
} from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ScrollIndex, ScrollEvent, ScrollType } from './types';

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

  @Output() update: EventEmitter<ScrollIndex> = new EventEmitter<ScrollIndex>();
  @Output() scroll: EventEmitter<ScrollEvent> = new EventEmitter<ScrollEvent>();

  @ViewChild('transit') transit: ElementRef;
  @ViewChild('scroll') scrollElementRef: ElementRef;
  @ViewChild('content') contentElementRef: ElementRef;

  public index: ScrollIndex;
  public previousIndex: ScrollIndex;
  public visible: ScrollIndex;
  public rows: number;
  public topPadding: number;

  private scrollTop: number;
  private scrollLeft: number;
  private yScrollSubscription$: Subscription;
  private xScrollSubscription$: Subscription;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    const scrollSubscription$: Observable<Event> = fromEvent(this.elementRef.nativeElement, 'scroll');
    this.yScrollSubscription$ = scrollSubscription$
      .pipe(debounceTime(this.debounceTime))
      .subscribe(() => {
        const scrollTop = this.elementRef.nativeElement.scrollTop;
        if (this.scrollTop !== scrollTop) {
          this.scrollTop = scrollTop;
          this.refresh();
        }
      });
    this.xScrollSubscription$ = scrollSubscription$
      .subscribe(() => {
        const scrollLeft = this.elementRef.nativeElement.scrollLeft;
        if (this.scrollLeft !== scrollLeft) {
          this.scrollLeft = scrollLeft;
          this.scroll.emit({
            type: ScrollType.Horizontal,
            scrollLeft: this.scrollLeft
          });
        }
      });
    this.scroll.emit({
      type: ScrollType.Vertical,
      index: this.getIndex()
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.previousIndex = undefined;
    this.refresh();
  }

  ngOnDestroy() {
    this.yScrollSubscription$.unsubscribe();
    this.xScrollSubscription$.unsubscribe();
  }

  /**
   * Gets the current Index of items that should be displayed based on the scroll position.
   */
  private getIndex(): ScrollIndex {
    const el = this.elementRef.nativeElement;
    const scrollHeight = this.rowHeight * this.size;
    el.scrollTop = Math.max(0, Math.min(el.scrollTop, scrollHeight));
    const start = Math.max(0, Math.floor(el.scrollTop / scrollHeight * this.size));
    const end = Math.min(this.size, Math.ceil(el.scrollTop / scrollHeight * this.size) + Math.ceil(el.clientHeight / this.rowHeight));
    return {
      start: start,
      end: end
    };
  }

  /**
   * @returns: Whether the grid is getting close to the start or end of the currently displayed content.
   */
  private shouldUpdate(index: ScrollIndex) {
    if (!this.index) {
      return true;
    }
    return ((Math.max(0, (index.start - this.rows)) < this.index.start)
      || (Math.min(this.size, (index.end + this.rows)) > this.index.end));
  }

  public refresh() {
    requestAnimationFrame(() => {
      const index = this.getIndex();

      this.scroll.emit({
        type: ScrollType.Vertical,
        index: this.getIndex()
      });

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
          this.index = this.previousIndex = index;
          this.update.emit(this.index);
        }
      }
    });
  }
}
