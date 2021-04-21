import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {KonektiloNodeResponse} from '../../models/KonektiloNodeResponse';

@Injectable({
  providedIn: 'root'
})
export class KonektiloService {
  constructor(public http: HttpClient) {
  }

  readNode(accessUrl: string): Observable<KonektiloNodeResponse> {
    return this.http.get<KonektiloNodeResponse>(accessUrl);
  }
}
