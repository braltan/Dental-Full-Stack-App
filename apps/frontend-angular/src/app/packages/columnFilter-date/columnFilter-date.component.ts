import { Component, Input, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { LanguageMessagesService } from '../util/languageMessagesService';
@Component({
  selector: 'app-columnFilter-date',
  templateUrl: './columnFilter-date.component.html'
})
export class ColumnFilterDateComponent implements OnInit {

  @Input() tableId: Table;
  @Input() field: string;

  matchModeOptionsForCalendar: SelectItem[] = [];
  msgjson;

  constructor(private languageMessagesService: LanguageMessagesService) { 

    this.matchModeOptionsForCalendar.push({ value: 'non', label: this.languageMessagesService.msgjson.chooseMatchMode });
    this.matchModeOptionsForCalendar.push({ value: 'before', label: this.languageMessagesService.msgjson.before });
    this.matchModeOptionsForCalendar.push({ value: 'after', label: this.languageMessagesService.msgjson.after });
  }

  ngOnInit(): void {
  }

  setFilterValues(value: Date, tableId: Table) {
    let calendar = document.getElementsByClassName('calendar-filtering');
    if (calendar.length === 2) {
        tableId.filters[this.field][1].value = value;
    } else if (calendar.length === 1) {
        tableId.filters[this.field][0].value = value;
    }
  }

}
