// import { Storage } from "@ionic/storage";
import { Observable, from } from "rxjs";
import { Injectable } from "@angular/core";

import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
// import { LoadingController, ToastController } from "@ionic/angular";
import { mergeMap, retry, map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class HttpRequestInterceptorService implements HttpInterceptor {
  // indicator: HTMLIonLoadingElement = null;
  requestsQueue: Array<any> = [];
  errorShowing = false;
  selectedAgency = 0;
  constructor(
    // private loading: LoadingController,
    // private toastController: ToastController,
    private storage: Storage,
    private router: Router
  ) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var tokenPromise = this.storage.get("idToken");
    var selectedAgency =
      localStorage["_ionicstorage/_ionickv/selectedAgencyId"];
    var tokenObservable = from(tokenPromise);
    return tokenObservable.pipe(
      mergeMap((token: string) => {
        //console.log("token " + token);
        if (token === undefined || token === null || token === "") {
          this.router.navigate(["home"]);
        }
        //this.showLoader();
        var customHeaders = {};
        if (token) {
          customHeaders['Authorization'] = `Bearer ${token}`
        }
        if (selectedAgency) {
          customHeaders['X-Agency'] = selectedAgency
        }
        const authorizedRequest = req.clone({
          headers: new HttpHeaders(customHeaders),
        });

        return next.handle(authorizedRequest).pipe(
          retry(1),
          map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              // this.hideLoader();
            }
            return event;
          }),
          catchError((err, caugth) => {
            if (err instanceof HttpErrorResponse) {
            }
            //this.showError();
            // this.hideLoader();
            throw err;
            //   this.hideLoader()/sd;
            return caugth;
          })
        );
      })
    );
  }
  /*async showError() {
    if (!this.errorShowing) {
      this.errorShowing = true;
      this.toastController
        .create({
          message: "Unable to complete your request.",
          cssClass: "toast-danger",
          duration: 4000,
        })
        .then((toast) => {
          toast.present();
          toast.onDidDismiss().then(() => {
            this.errorShowing = false;
          });
        });
    }
  }*/
  /*showLoader() {
    if (this.indicator == null) {
      this.indicator = {} as HTMLIonLoadingElement;
      if (this.requestsQueue.length == 0)
        this.loading
          .create({
            message: "Please wait...",
            duration: 5000,
          })
          .then((res) => {
            this.indicator = res;
            res.present();

            res.onDidDismiss().then((dis) => {
              //console.log("Loading dismissed!");
            });
          });
    }
    this.requestsQueue.push({});
  }*/

  /*hideLoader() {
    this.requestsQueue.pop();
    if (this.requestsQueue.length == 0) {
      if (this.indicator != null || this.indicator != undefined)
        if (this.indicator.dismiss) this.indicator.dismiss();
      this.indicator = null;
    }
  }*/
}
