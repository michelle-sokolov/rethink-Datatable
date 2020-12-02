import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import * as data from './school-data.json';
import { map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
// import axios from "axios";
import { SchoolsService } from './app.services';
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
  queryText: '';
  queryURL = 'http://localhost:3000/api/products';
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
  dataFile: Object;
  constructor(public httpClient: HttpClient, public schoolsService: SchoolsService,
  ) { }
  // tslint:disable-next-line: use-lifecycle-interface
  // tslint:disable-next-line: typedef
  ngOnInit() {
    // console.log('data here ', data);
    this.fetchData();
    // this.fetchData2();
    this.fetchAll();
  }
  // tslint:disable-next-line: typedef
  fetchData() {
    this.schoolData = data;
    this.finalData = this.schoolData.default;
    // console.log('data ', this.finalData);
    this.loading = true;
    this.rows = this.finalData;
    this.filteredRows = this.finalData;

  }
  // search function
  filterRows($event) {
    const val = $event.target.value.toLowerCase();
    // tslint:disable-next-line: triple-equals
    if (val.length === 0) {
      this.filteredRows = this.rows;
    }
    if (val.length < 3) {
      return;
    }
    // filter only intialized after query length is greater than 3
    this.filteredRows = this.rows.filter((row: any) => {
      let fullTextSearch = '';
      for (const filterColumn of this.filterColumns) {
        fullTextSearch = fullTextSearch + row[filterColumn];
      }
      fullTextSearch = fullTextSearch.toLocaleLowerCase(); // normalize query
      let valLowerCase = val.toLowerCase(); // normalize query
      return (fullTextSearch.indexOf(valLowerCase) >= 0);

    });
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  // clear search field
  clearSearch() {
    this.queryText = '';
    this.filteredRows = this.rows;
  }
  /*getSchools() {
    return axios.get(this.queryURL);
  }*/
  fetchAll() {

    this.schoolsService.getNews().subscribe((data) => {
      console.log(data);
      // this.articles = data['articles'];
    });
  }
  /*
getSchools() {
console.log('getSchools()'); // todo: comment out logging as needed for prod
return this.loadSchools().pipe(map(this.processSchools, this));
}

private loadSchools() {
console.log('loadSchools() with url: ', 'http://localhost:3000/api/products');
return this.httpClient.get('http://localhost:3000/api/products');
}

processSchools(data: any) {
console.log('processSchools() with', data.length, 'rows.');
console.log('local ', data)
return data;
}*/
}
