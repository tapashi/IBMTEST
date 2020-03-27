import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {
  }
  get(url) {
    return this.http.get(url)
          .pipe(
              catchError( err => {
                return throwError(err);
              }),
              catchError(this.onError)
          )
          .pipe(finalize(() => {
            console.log('Finalize');
          }));
  }

  post(url, postBody: any, options = null) {
    if (options) {
      return this.http.post(url, postBody, options)
        .pipe(map(res => res))
        .pipe(catchError( err => {
          return throwError(err);
        }), catchError(this.onError))
        .pipe(finalize(() => {
          console.log('Submitted successfully');
        }));
    } else {
      return this.http.post(url, postBody)
        .pipe(map(res => res))
        .pipe(catchError( err => {
          return throwError(err);
        }), catchError(this.onError))
        .pipe(finalize(() => {
          console.log('resoponse got loaded');
        }));
    }
  }
  delete(url, options) {
    return this.http.delete(url, options)
      .pipe(finalize(() => {
        console.log('something went wrong delete method');
      }));
  }
  put(url, putData = null) {
    return this.http.put(url, putData).pipe(map(res => res)).pipe(catchError(this.onError))
      .pipe(finalize(() => {
        console.log('something went wrong Put method');
      }));
  }
  patch(url, patchtData) {
    return this.http.put(url, patchtData).pipe(map(res => res)).pipe(catchError(this.onError))
      .pipe(finalize(() => {
        console.log('something went wrong Put method');
      }));
  }
  onError(errorResponse: any) {
      return throwError(errorResponse);
  }
}

