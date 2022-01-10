import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
// import { RequestOptions } from 'http';
import { Observable } from 'rxjs';
import { AppSettings } from './config';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

   post(
    endPoint: any,
    data?: any,
    redirectOnAuthFail = true,
    auth = false
  ): Observable<any> {

    return new Observable((observer) => {
      this.http
        .post(AppSettings.URL + endPoint, data,auth ? this.getOptions() : '')
        .subscribe(
          (res: any) => {
            // console.log("Response in")
            // if (toJSON) {
            //   res = res.json();
            // }
            observer.next(res);
            observer.complete();
          },
          (error) => {
            try {
              error = error.json();
            } catch (exception) {
            //   console.error(
            //     `Request at ${AppSettings.URL + endPoint} returned an error`,
            //     error
            //   );
              observer.error(error);
              observer.complete();
              return;
            }

            // console.error(
            //   `Request at ${AppSettings.URL + endPoint} returned an error`,
            //   error
            // );
            if (
              [990, 991, 992, "TokenExpiredError", "JsonWebTokenError"].indexOf(
                error.code
              ) !== -1 &&
              redirectOnAuthFail
            ) {
              this.router.navigateByUrl("/logout");
            //   this.notifications.failure(
            //     "Authentication Error",
            //     "Please login again."
            //   );
              observer.complete();
              return;
            }
            observer.error(error);
            observer.complete();
          }
        );
    });
  }

  getOptions(withContentType = true): any {
    let authToken:any = this.getAuthToken();
    const options ={
      headers: new HttpHeaders().append("token", authToken).append("Content-Type", "application/json")
    }

    return options;
  }

  getAuthToken() {
    return localStorage.getItem("token");
  }

  getById(endPoint : any, id : any): Observable<any> {
    return this.http.post(AppSettings.URL + endPoint,id).pipe((res : any) => res.json());
  }

}
