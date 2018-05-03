import { Injectable, EventEmitter } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { EasyGridColumn } from '../easy-grid-column/easy-grid-column';
import { ScrollIndex } from '@ngx-easy/virtual-scroll';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EasyGridService {
  public data: any[];
  public _data: any[];
  public columns: Array<EasyGridColumn> = [];
  public rowHeight: number;
  public buffer: number;
  public debounceTime: number;
  public sortable: boolean;
  public filterable: boolean;
  public headerHeight: number;
  public footerHeight: number;

  public index: ScrollIndex;
  public horizontalScrollEvent: EventEmitter<number> = new EventEmitter();

  public isMobile: boolean;
  public hasScrollBar: boolean;

  constructor(
    private deviceService: DeviceDetectorService,
  ) {
    this.isMobile = !this.deviceService.isDesktop();
  }
}
