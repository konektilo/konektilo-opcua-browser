import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {KonektiloOpcUaServer} from "../../models/KonektiloOpcUaServer";
import {KonektiloResponse} from "../../models/KonektiloResponse";

@Injectable({
  providedIn: 'root'
})
export class KonektiloBrowserService {
  apiVersion = 'v1';

  constructor(public http: HttpClient) {
  }

  readOpcUaServer(konektiloUrl: string): Observable<KonektiloResponse<KonektiloOpcUaServer>> {
    return this.http.get<KonektiloResponse<KonektiloOpcUaServer>>(konektiloUrl + '/api/' + this.apiVersion + '/server');
  }

  readNode(opcUaServerBrowseUrl: string): Observable<KonektiloResponse<KonektiloBrowseNode>> {
    return this.http.get<KonektiloResponse<KonektiloBrowseNode>>(opcUaServerBrowseUrl);
  }

  readRootNode(opcUaServerBrowseUrl: string, namespace: number, identifier: string | number): Observable<KonektiloResponse<KonektiloBrowseNode>> {
    return this.http.get<KonektiloResponse<KonektiloBrowseNode>>(opcUaServerBrowseUrl + '/' + namespace.toString() + '/browse/' + identifier.toString());
  }
}
