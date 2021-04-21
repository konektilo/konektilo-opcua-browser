import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {KonektiloNodeResponse} from '../../models/KonektiloNodeResponse';

@Injectable({
  providedIn: 'root'
})
export class KonektiloService {
  constructor(public http: HttpClient) {
  }

  async readNode(accessUrl: string): Promise<KonektiloNodeResponse> {
    return this.http.get<KonektiloNodeResponse>(accessUrl).toPromise();
  }
}
