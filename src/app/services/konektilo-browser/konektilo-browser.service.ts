import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {KonektiloOpcUaServer} from '../../models/KonektiloOpcUaServer';
import {KonektiloResponse} from '../../models/KonektiloResponse';

@Injectable({
  providedIn: 'root'
})
export class KonektiloBrowserService {
  apiVersion = 'v1';

  constructor(public http: HttpClient) {
  }

  readOpcUaServer(konektiloUrl: string): Observable<KonektiloResponse<KonektiloOpcUaServer>> {
    return this.http.get<KonektiloResponse<KonektiloOpcUaServer>>(konektiloUrl + '/api/' + this.apiVersion + '/browse');
  }

  readNode(opcUaServerBrowseUrl: string): Observable<KonektiloResponse<KonektiloBrowseNode>> {
    return this.http.get<KonektiloResponse<KonektiloBrowseNode>>(opcUaServerBrowseUrl);
  }

  async readNodeNew(opcUaServerBrowseUrl: string): Promise<KonektiloBrowseNodeInternal[]> {
    const nodes: KonektiloBrowseNodeInternal[] = [];
    // await this.http.get<KonektiloResponse<KonektiloBrowseNode>>(opcUaServerBrowseUrl).subscribe(konektiloResponse => {
    //   Object.entries(konektiloResponse.result).forEach(([key, value]) => {
    //     const intBrowseNode = value as KonektiloBrowseNodeInternal;
    //     intBrowseNode.nodeId = key;
    //     intBrowseNode.children = [];
    //     intBrowseNode.childrenFetched = false;
    //     nodes.push(intBrowseNode);
    //   });
    // });
    const konektiloResponse = await this.http.get<KonektiloResponse<KonektiloBrowseNode>>(opcUaServerBrowseUrl).toPromise();
    Object.entries(konektiloResponse.result).forEach(([key, value]) => {
      const intBrowseNode = value as unknown as KonektiloBrowseNodeInternal;
      intBrowseNode.nodeId = key;
      intBrowseNode.name = value.displayName;
      intBrowseNode.children = [];
      intBrowseNode.childrenFetched = false;
      intBrowseNode.expandable = intBrowseNode.childCount > 0;
      intBrowseNode.level = undefined;
      nodes.push(intBrowseNode);
    });
    return nodes;
  }
}
