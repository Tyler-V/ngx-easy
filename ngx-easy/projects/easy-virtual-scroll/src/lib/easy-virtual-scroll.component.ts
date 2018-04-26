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
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'ez-virtual-scroll',
  templateUrl: './easy-virtual-scroll.component.html',
  styleUrls: ['./easy-virtual-scroll.component.scss']
})
export class EasyVirtualScrollComponent implements OnInit, OnChanges, OnDestroy {

  @HostBinding('class') class = 'ez-virtual-scroll';

  @Input() size: number;
  @Input() rowHeight: number;
  @Input() rowPadding: number;
  @Input() debounceTime: number;

  @Output() update: EventEmitter<Index> = new EventEmitter<Index>();
  @Output() scroll: EventEmitter<ScrollEvent> = new EventEmitter<ScrollEvent>();

  @ViewChild('transit') transit: ElementRef;
  @ViewChild('scroll') scrollElementRef: ElementRef;
  @ViewChild('content') contentElementRef: ElementRef;

  public index: Index;
  public previousIndex: Index;
  public visible: Index;
  public rows: number;
  public scrollHeight: number;
  public topPadding: number;

  private scrollTop: number;
  private scrollLeft: number;
  private yScrollSubscription$: Subscription;
  private xScrollSubscription$: Subscription;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.scrollHeight = this.rowHeight * this.size;
    const scrollSubscription$: Observable<Event> = Observable.fromEvent(this.elementRef.nativeElement, 'scroll');
    this.yScrollSubscription$ = scrollSubscription$
      .debounceTime(this.debounceTime)
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
  private getIndex(): Index {
    const el = this.elementRef.nativeElement;
    el.scrollTop = Math.max(0, Math.min(el.scrollTop, this.scrollHeight));
    const start = Math.max(0, Math.floor(el.scrollTop / this.scrollHeight * this.size));
    const end = Math.min(this.size, Math.ceil(el.scrollTop / this.scrollHeight * this.size) + Math.ceil(el.clientHeight / this.rowHeight));
    return {
      start: start,
      end: end
    };
  }

  /**
   * @returns: Whether the grid is getting close to the start or end of the currently displayed content.
   */
  private shouldUpdate(index: Index) {
    if (!this.index) {
      return true;
    }
    return ((Math.max(0, (index.start - this.rows)) < this.index.start)
      || (Math.min(this.size, (index.end + this.rows)) > this.index.end));
  }

  private refresh() {
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

      if (this.rowPadding == null) {
        this.rowPadding = this.rows * 1;
      }

      this.topPadding = Math.max(0, ((this.rowHeight * index.start) - (this.rowHeight * this.rowPadding)));
      index.start = Math.max(0, (index.start - this.rowPadding));
      index.end = Math.min(this.size, (index.end + this.rowPadding));

      if (this.previousIndex === undefined || index.start !== this.previousIndex.start || index.end !== this.previousIndex.end) {
        if (!isNaN(index.start) && !isNaN(index.end)) {
          this.index = this.previousIndex = index;
          this.update.emit(this.index);
        }
      }
    });
  }
}

export interface Index {
  start?: number;
  end?: number;
}

export interface ScrollEvent {
  type: ScrollType;
  index?: Index;
  scrollLeft?: number;
}

export enum ScrollType {
  Horizontal, Vertical
}
