import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestService {
  apiUrl = 'http://localhost:5000/api/v1/server/demoboard/namespace/4';

  constructor(public http: HttpClient) {
  }

  get<T>(nodeId): Observable<T> {
    return this.http.get<T>(this.apiUrl + '/identifier/' + nodeId);
  }

  put<T>(nodeId, putdata): Observable<T> {
    return this.http.put<T>(this.apiUrl + '/identifier/' + nodeId, {variableData: putdata});
  }

  post<T>(nodeId, postdata): Observable<T> {
    return this.http.post<T>(this.apiUrl + '/identifier/' + nodeId, {variableData: postdata});
  }

  // //Example request
  // getOrderMessage(): Observable<IKonektiloResponse> {
  //   return this.get<IKonektiloResponse>('GVL.test_string_rw');
  // }

  // putOrderMessage(data): Observable<IKonektiloResponse> {
  //   return this.put<IKonektiloResponse>('GVL.test_string_rw', data);
  // }

  // putLedStaus(data): Observable<IKonektiloResponse> {
  //   return this.put<IKonektiloResponse>('GVL.led_Button_rw', data);
  // }

  // postLedBlink(data): Observable<IKonektiloResponse> {
  //   return this.post<IKonektiloResponse>('Main.blink%23Blink_led', data);
  }
}
