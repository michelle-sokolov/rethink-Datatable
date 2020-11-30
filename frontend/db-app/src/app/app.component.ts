import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import * as data from './school-data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  schoolData: any;
  finalData: any;
  loading: boolean;
  rows: any;
  filteredRows: any;
  // initialize columns
  columns = [
    { name: 'School Name', prop: 'schoolName' },
    { name: 'CDS Code', prop: 'cdsCode' },
    { name: 'Grade Config', prop: 'gradeConfig' },
    { name: 'Type', prop: 'type' },
  ];
  filterColumns = ['cdsCode', 'schoolName', 'gradeConfig', 'type'];
  defaultSort = [{ prop: 'schoolName', dir: 'asc' }];

  // tslint:disable-next-line: use-lifecycle-interface
  // tslint:disable-next-line: typedef
  ngOnInit() {
    console.log('data here ', data);
    this.fetchData();
  }
  // tslint:disable-next-line: typedef
  fetchData() {
    this.schoolData = data;
    this.finalData = this.schoolData.default;
    console.log('data ', this.finalData);
    this.loading = true;
    this.rows = this.finalData;
    this.filteredRows = this.finalData;
  }
}
