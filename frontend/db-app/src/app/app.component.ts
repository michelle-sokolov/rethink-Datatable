import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import * as data from './school-data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  schoolData: any;
  finalData: any;
  loading: Boolean;
  rows: any;
  filteredRows: any;
  title = 'db-app';
  ngOnInit() {
    console.log('data here ', data);
    this.fetchData;
  }
  fetchData() {
    this.schoolData = data;
    this.finalData = this.schoolData.default;
    console.log('data ', this.finalData);
    this.loading = true;
    this.rows = this.finalData;
    this.filteredRows = this.finalData;
  }
}
