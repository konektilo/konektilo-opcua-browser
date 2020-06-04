import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BrowsePoint} from "../../models/BrowsePoint";
import {KonektiloOpcUaServer} from "../../models/KonektiloOpcUaServer";
import {KonektiloResponse} from "../../models/KonektiloResponse";
import {KonektiloNamespace} from "../../models/KonektiloNamespace";

@Injectable({
  providedIn: 'root'
})
export class KonektiloBrowserService {
  konektiloBaseUrl = 'http://localhost';
  konektiloPort = '5000';
  apiVersion = 'v1';

  constructor(public http: HttpClient) {
  }

  readOpcUaServer(): Observable<KonektiloResponse<KonektiloOpcUaServer>> {
    return this.http.get<KonektiloResponse<KonektiloOpcUaServer>>(this.urlBuilder(BrowsePoint.Server));
  }

  readNamespaces(opcUaServer: string): Observable<KonektiloResponse<KonektiloNamespace>> {
    return this.http.get<KonektiloResponse<KonektiloNamespace>>(this.urlBuilder(BrowsePoint.Namespace, opcUaServer));
  }

  // readNode(opcUaServer: string, namespace: number, identifier: string): Observable<KonektiloResponse> {
  //   return this.http.get<KonektiloResponse>(this.urlBuilder(opcUaServer, namespace, identifier));
  // }

  private urlBuilder(browsePoint: BrowsePoint, opcUaServer?: string): string {
    let url = this.konektiloBaseUrl + ':' + this.konektiloPort + '/api/' + this.apiVersion + '/server';
    switch (browsePoint) {
      case BrowsePoint.Server:
        break;
      case BrowsePoint.Namespace:
        url += '/' + opcUaServer + '/namespace';
        break;
    }
    return url;
  }

  // private urlBuilder(opcUaServer: string, namespace: number, identifier: string): string {
  //   return this.konektiloBaseUrl + ':' + this.konektiloPort + '/api/' + this.apiVersion + '/server/' + opcUaServer +
  //     '/namespace/' + namespace.toString() + '/identifier/' + identifier;
  // }
}
