import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {IMyDrpOptions, IMyDateRangeModel} from 'mydaterangepicker';

import { DefaultFilter } from './default-filter';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'daterange-filter',
  template: `      
	<my-date-range-picker class="form-control" 
                          name="mydaterange"
						  [ngClass]="inputClass"
                          [options]="myDateRangePickerOptions"
						  (dateRangeChanged)="onDateRangeChanged($event)">
    </my-date-range-picker>
  `,
})
export class DateRangeFilterComponent extends DefaultFilter implements OnInit {

  myDateRangePickerOptions: IMyDrpOptions = {
    // other options...
    dateFormat: 'mm/dd/yyyy',
  };

  dateRangeContent = new Subject<any>();

  constructor() {
    super();
  }

  ngOnInit() {
    const config = this.column.getFilterConfig().daterange;
    this.myDateRangePickerOptions.dateFormat = config.format;
    if (this.column.width) {
      this.myDateRangePickerOptions.width = this.column.width;
    }

    if (config.align) {
      if (config.align === 'left') {
        this.myDateRangePickerOptions.alignSelectorRight = false;
      } else {
        if (config.align === 'right') {
          this.myDateRangePickerOptions.alignSelectorRight = true;
        }
      }
    }

    if (this.column.filterFunction === null || typeof this.column.filterFunction === 'undefined') {
      this.column.filterFunction = (value: string, search: string) => {
        if (search === '0..0') {
          return true;
        }

        const dates: string[] = search.split('..');
        const time = new Date(value).getTime() / 1000;
        return Number.parseInt(dates[0]) < time && Number.parseInt(dates[1]) > time;
      };
    }

    this.changesSubscription = this.dateRangeContent
        .map((ev: any) => (ev && ev.title) || ev || '')
        .distinctUntilChanged()
        .debounceTime(this.delay)
        .subscribe((search: string) => {
          this.query = search;
          this.setFilter();
        });
  }

  onDateRangeChanged(event: IMyDateRangeModel) {
    // event properties are: event.beginDate, event.endDate, event.formatted,
    // event.beginEpoc and event.endEpoc

    const range = `${event.beginEpoc}..${event.endEpoc}`;
    this.dateRangeContent.next(range);
  }
}
