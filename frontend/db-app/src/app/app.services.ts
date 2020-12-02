// used for schools landing page, activity details, generate reports, calendar,
// school details, update award modal, update funding, update student
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class SchoolsService {

    public idToken: string;

    constructor(public httpClient: HttpClient, public storage: Storage) { }
    // fetch schools
    getSchools() {
        console.log('getSchools()'); // todo: comment out logging as needed for prod
        return this.loadSchools().pipe(map(this.processSchools, this));
    }

    public loadSchools() {
        console.log('loadSchools() with url: ', 'http://localhost:3000/api/products');
        return this.httpClient.get('http://localhost:3000/api/products');
    }

    processSchools(data: any) {
        return data;
    }
    public getNews() {
        return this.httpClient.get(`http://localhost:3000/api/products`);
    }
}
