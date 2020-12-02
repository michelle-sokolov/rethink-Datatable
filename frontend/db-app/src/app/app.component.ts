import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { SchoolsService } from './app.services';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // tslint:disable-next-line: member-access
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  public schoolData: any;
  public finalData: any;
  public loading: boolean;
  public rows: any;
  public queryText: '';
  public filteredRows: any;
  // define columns
  public columns = [
    { name: 'School Name', prop: 'schoolName' },
    { name: 'CDS Code', prop: 'cdsCode' },
    { name: 'Grade Config', prop: 'gradeConfig' },
    { name: 'Type', prop: 'type' },
  ];
  public filterColumns = ['cdsCode', 'schoolName', 'gradeConfig', 'type'];
  public defaultSort = [{ prop: 'schoolName', dir: 'asc' }];
  public dataFile: Object;
  constructor(public schoolsService: SchoolsService,
  ) { }

  ngOnInit() {
    this.fetchAll();
  }
  // GET data
  fetchAll() {
    this.schoolsService.getNews().subscribe((data) => {
      console.log('data: ', Object.values(data)[0]);
      this.rows = Object.values(data)[0];
      this.filteredRows = this.rows;
    });
  }
  // search function
  filterRows($event) {
    const val = $event.target.value.toLowerCase();
    // tslint:disable-next-line: triple-equals
    if (val.length === 0) {
      this.filteredRows = this.rows;
    }
    // filter only intialized after query length is greater than 1
    if (val.length < 1) {
      return;
    }
    this.filteredRows = this.rows.filter((row: any) => {
      let fullTextSearch = '';
      for (const filterColumn of this.filterColumns) {
        fullTextSearch = fullTextSearch + row[filterColumn];
      }
      fullTextSearch = fullTextSearch.toLocaleLowerCase(); // normalize query
      let valLowerCase = val.toLowerCase(); // normalize query
      return (fullTextSearch.indexOf(valLowerCase) >= 0);

    });
    this.table.offset = 0;
  }
  // clear search field
  clearSearch() {
    this.queryText = '';
    this.filteredRows = this.rows;
  }
}
