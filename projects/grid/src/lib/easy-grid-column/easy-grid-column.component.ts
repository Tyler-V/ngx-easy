import { Component, OnInit, Input, TemplateRef, ViewChild, ContentChild, ElementRef } from '@angular/core';
import { EasyGridService } from '../services/easy-grid.service';
import { EasyGridColumn, EasyGridColumnType } from './easy-grid-column';
import { EasySort } from '../easy-grid-header/sorting';
import { EasyFilter } from '../easy-grid-header/filtering';

@Component({
  selector: 'ez-grid-column',
  templateUrl: './easy-grid-column.component.html'
})
export class EasyGridColumnComponent implements OnInit {

  @Input() field: string;
  @Input() title: string;
  @Input() width: number;
  @Input() type: string;
  @Input() sortable: boolean;
  @Input() filterable: boolean;

  @ContentChild(TemplateRef)
  public externalTemplate: TemplateRef<any>;

  @ViewChild('template')
  public template: TemplateRef<any>;

  constructor(private gridService: EasyGridService, private elementRef: ElementRef) { }

  ngOnInit() {
    this.gridService.columns.push(
      <EasyGridColumn>{
        index: this.gridService.columns.length,
        field: this.field,
        title: this.title,
        type: this.type ? this.type : this.getColumnType(this.gridService.data[this.gridService.columns.length][this.field]),
        width: Number(this.width),
        template: this.template,
        sort: EasySort.None,
        sortable: this.sortable ? this.sortable : this.gridService.sortable,
        filter: EasyFilter.Contains,
        filterable: this.filterable ? this.filterable : this.gridService.filterable
      }
    );
  }

  private getColumnType(data): EasyGridColumnType {
    return EasyGridColumnType.String;
  }
}
