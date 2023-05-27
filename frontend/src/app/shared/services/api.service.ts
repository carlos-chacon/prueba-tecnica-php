import { Injectable, EventEmitter, Output } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public headers: HttpHeaders;
  public readonly url: string = environment.api;

  @Output() showProgressBarToolbar: EventEmitter<any> = new EventEmitter();

  constructor(public http: HttpClient) {
    this.headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
    });

    this.showProgressBarToolbar.emit(false);
  }

  getObs(endpoint: string, params?: IUrlParams): Observable<object> {
    return this.checkObs(
      this.http.get(this.getUrl(endpoint, params), {
        headers: this.headers,
      })
    );
  }

  public getUrl(endpoint: string, params?: IUrlParams): string {
    return this.url + '/api' + (endpoint || '/') + this.parseParams(params);
  }

  private parseParams(params?: IUrlParams): string {
    let parsed = '';
    if (params) {
      Object.keys(params).forEach((k, i) => {
        parsed += i === 0 ? '?' : '&';
        parsed += k + '=' + params[k];
      });
    }
    return parsed;
  }

  private checkObs(observable: Observable<object>): Observable<object> {
    this.showProgressBarToolbar.emit(true);

    const checkObs = new Observable<object>((subscriber) => {
      if (!window.navigator.onLine) {
        this.showProgressBarToolbar.emit(false);
        subscriber.error(
          'Error: Comprueba si la conexión Wi-Fi está activada y si estás conectado'
        );
      } else {
        observable.subscribe({
          next: (v) => {
            this.showProgressBarToolbar.emit(false);
            subscriber.next(v);
            subscriber.complete();
          },
          error: (e: HttpErrorResponse) => {
            this.showProgressBarToolbar.emit(false);
            subscriber.error(e);
          },
        });
      }
    });

    return checkObs;
  }
}

interface IUrlParams {
  [key: string]: string | number | boolean;
}
