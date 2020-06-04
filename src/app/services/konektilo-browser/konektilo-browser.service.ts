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

  // readNamespaces(opcUaServer: string): Observable<KonektiloResponse<KonektiloNamespace>> {
  //   return this.http.get<KonektiloResponse<KonektiloNamespace>>(this.urlBuilder(BrowsePoint.Namespace, opcUaServer));
  // }

  readNode(opcUaServerBrowseUrl: string): Observable<KonektiloResponse<KonektiloBrowseNode>> {
    return this.http.get<KonektiloResponse<KonektiloBrowseNode>>(opcUaServerBrowseUrl);
  }

  readRootNode(opcUaServerBrowseUrl: string, namespace: number, identifier: string | number): Observable<KonektiloResponse<KonektiloBrowseNode>> {
    return this.http.get<KonektiloResponse<KonektiloBrowseNode>>(this.urlBuilder(BrowsePoint.Node, opcUaServerBrowseUrl, namespace, identifier));
  }

  private urlBuilder(browsePoint: BrowsePoint, opcUaServerBrowseUrl?: string, namespace?: number, identifier?: string| number): string {
    let url = this.konektiloBaseUrl + ':' + this.konektiloPort + '/api/' + this.apiVersion + '/server';
    switch (browsePoint) {
      // case BrowsePoint.Namespace:
      //   url += '/' + opcUaServer + '/namespace';
      //   break;
      case BrowsePoint.Node:
        url = opcUaServerBrowseUrl + '/' + namespace.toString() + '/browse/' + identifier.toString();
        break;
    }
    return url;
  }
}
