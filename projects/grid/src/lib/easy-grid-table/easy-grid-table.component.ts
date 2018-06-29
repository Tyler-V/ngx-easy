import { Component, HostBinding, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { EasyGridService } from './../services/easy-grid.service';
import { EasyVirtualScrollComponent } from '@ngx-easy/virtual-scroll';
import { ScrollIndex, ScrollEvent, ScrollType } from '@ngx-easy/virtual-scroll';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'ez-grid-table',
  templateUrl: './easy-grid-table.component.html',
  styleUrls: ['./easy-grid-table.component.scss']
})
export class EasyGridTableComponent implements OnInit, OnDestroy {

  @HostBinding('style.height') height: string = 'calc(100% - ' + (this.gridService.headerHeight + this.gridService.footerHeight) + 'px)';

  @ViewChild('vs') vs: EasyVirtualScrollComponent;

  private windowResizeSubscription$: Subscription;

  constructor(private elementRef: ElementRef, public gridService: EasyGridService) { }

  ngOnInit() {
    this.gridService.hasScrollBar = !this.gridService.isMobile &&
      (this.gridService.data.length * this.gridService.rowHeight >= this.elementRef.nativeElement.offsetHeight);

    this.windowResizeSubscription$ = fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(() => {
        this.vs.refresh();
      });
  }

  ngOnDestroy() {
    this.windowResizeSubscription$.unsubscribe();
  }

  trackByFn(index, item) {
    return index;
  }

  onScroll(event: ScrollEvent) {
    switch (event.type) {
      case ScrollType.Vertical:
        this.gridService.index = event.index;
        break;
      case ScrollType.Horizontal:
        this.gridService.horizontalScrollEvent.emit(event.scrollLeft);
        break;
    }
  }
}
