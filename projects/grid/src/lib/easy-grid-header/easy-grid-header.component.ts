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

  private sortWorkers: Promise<any>[] = [];
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

  filter() {
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

    this.webWorkerService.run(Filtering.filter, {
      data: this.gridService._data,
      columns: _.map(columns, column => _.pick(column, ['index', 'filter', 'filterText']))
    }).then(data => {
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

    this.sortWorkers.forEach(worker => {
      this.webWorkerService.terminate(worker);
    });
    this.sortWorkers = [];

    if (column.sort !== EasySort.None) {
      const worker = this.webWorkerService.run(Sorting.FastSort, {
        data: this.gridService.data,
        field: column.field,
        sort: column.sort
      });
      this.sortWorkers.push(worker);
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
