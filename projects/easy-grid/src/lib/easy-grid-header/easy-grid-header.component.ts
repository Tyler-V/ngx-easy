import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { EasyGridService } from '../services/easy-grid.service';
import { EasyGridColumn } from '../easy-grid-column/easy-grid-column';
import { WebWorkerService } from '../services/web-worker.service';
import { EasySort, Sorting } from './sorting';
import { EasyFilter, Filtering } from './filtering';
import { Subscription } from 'rxjs/Subscription';
import { MatMenu } from '@angular/material/menu';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as _ from 'lodash';
/// <reference path="../../../typings/globals/underscore/index.d.ts" />

@Component({
  selector: 'ez-grid-header',
  templateUrl: './easy-grid-header.component.html',
  styleUrls: ['./easy-grid-header.component.scss'],
  providers: [WebWorkerService]
})
export class EasyGridHeaderComponent implements OnInit, OnDestroy {

  filters = [EasyFilter.Contains, EasyFilter.Equals, EasyFilter.DoesNotContain];
  @ViewChild('filterMenu') filterMenu: MatMenu;
  @ViewChild('header') header: ElementRef;
  filter$ = new Subject<string>();

  private workers: Promise<any>[] = [];
  private filterSubscription: Subscription;
  private scrollSubscription: Subscription;

  constructor(public gridService: EasyGridService, private webWorkerService: WebWorkerService) {
    this.scrollSubscription = this.gridService.horizontalScrollEvent.subscribe(scrollLeft => {
      this.header.nativeElement.scrollLeft = scrollLeft;
    });
  }

  ngOnInit() {
    this.filterSubscription =
      this.filter$.pipe(
        debounceTime(500),
      ).subscribe(() => this.filter());
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
    this.scrollSubscription.unsubscribe();
  }

  setColumnFilter(column: EasyGridColumn, filter: EasyFilter) {
    column.filter = filter;
  }

  clearFilter(column: EasyGridColumn) {
    column.filterText = '';
    this.filter$.next('');
  }

  async filter() {
    const columns: Array<EasyGridColumn> = [];
    this.gridService.columns.forEach(column => {
      if (column.filterText) {
        column.filtering = true;
        columns.push(column);
      }
    });

    if (columns.length === 0) {
      this.gridService.data = this.gridService._data;
      return;
    }

    function filter(input: any): any[] {
      const Contains = (index, filterText) => value => {
        return value[Object.keys(value)[index]].includes(filterText);
      };
      let data = input.data;
      for (const column of input.columns) {
        data = data.filter(Contains(column.index, column.filterText));
      }
      return data;
    }

    const worker = this.webWorkerService.run(Filtering.filter, {
      data: this.gridService._data,
      columns: _.map(columns, column => _.pick(column, ['index', 'filter', 'filterText']))
    });
    this.workers.push(worker);
    worker.then(data => {
      this.gridService.data = data;
      this.gridService.columns.forEach(column => column.filtering = false);
    }).catch(error => console.log(error));
  }

  sort(column: EasyGridColumn) {
    if (!column.sortable) {
      return;
    }

    column.sorting = true;

    switch (column.sort) {
      case EasySort.None:
        column.sort = EasySort.Ascending;
        break;
      case EasySort.Ascending:
        column.sort = EasySort.Descending;
        break;
      default: column.sort = EasySort.None;
    }

    this.gridService.columns.forEach(_column => {
      if (_column !== column) {
        _column.sorting = false;
        _column.sort = EasySort.None;
      }
    });

    this.workers.forEach(worker => {
      this.webWorkerService.terminate(worker);
    });
    this.workers = [];

    if (column.sort !== EasySort.None) {
      const worker = this.webWorkerService.run(Sorting.sort, {
        data: this.gridService.data,
        field: column.field,
        sort: column.sort
      });
      this.workers.push(worker);
      worker.then(data => {
        column.sorting = false;
        this.gridService.data = data;
      }).catch(error => console.log(error));
    } else {
      column.sorting = false;
      this.gridService.data = this.gridService._data;
    }
  }
}
