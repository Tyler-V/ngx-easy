
import {
  Component,
  OnInit,
  HostBinding,
  ElementRef,
  Input,
  ContentChildren,
  QueryList,
  forwardRef
} from '@angular/core';
import { EasyGridColumnComponent } from './easy-grid-column/easy-grid-column.component';
import { EasyGridService } from './services/easy-grid.service';

@Component({
  selector: 'ez-grid',
  templateUrl: './easy-grid.component.html',
  styleUrls: ['./easy-grid.component.scss'],
  providers: [EasyGridService]
})
export class EasyGridComponent implements OnInit {

  @HostBinding('class.ez-grid') class = true;

  // Required
  @Input() data: any[];
  @Input() rowHeight: number;

  // Optional
  @Input() buffer: number;
  @Input() debounceTime: number;
  @Input() sortable: boolean;
  @Input() filterable: boolean;
  @Input() headerHeight: number;
  @Input() footer: boolean;
  @Input() footerHeight: number;

  @ContentChildren(forwardRef(() => EasyGridColumnComponent))
  public columns: QueryList<EasyGridColumnComponent>;

  constructor(private elementRef: ElementRef, public gridService: EasyGridService) { }

  ngOnInit() {
    this.gridService.data = this.gridService._data = this.data;
    this.gridService.rowHeight = this.rowHeight;
    this.gridService.buffer = this.buffer;
    this.gridService.debounceTime = this.debounceTime;
    this.gridService.headerHeight = this.headerHeight ? this.headerHeight : this.rowHeight;
    this.gridService.footerHeight = this.footerHeight ? this.footerHeight : this.rowHeight / 2;
    this.gridService.footer = !this.footer ? true : this.footer === true;
    this.gridService.sortable = !this.sortable ? true : this.sortable === true;
    this.gridService.filterable = !this.filterable ? true : this.filterable === true;
  }
}
