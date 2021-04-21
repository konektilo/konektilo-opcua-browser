import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {KonektiloOpcUaServer} from '../../models/KonektiloOpcUaServer';
import {KonektiloResponse} from '../../models/KonektiloResponse';
import {SettingsStorageService} from '../settings-storage/settings-storage.service';

@Injectable({
  providedIn: 'root'
})
export class KonektiloBrowserService {
  apiVersion = 'v1';

  constructor(public http: HttpClient, public settingsStorageService: SettingsStorageService) {
  }

  async readOpcUaServer(): Promise<KonektiloResponse<KonektiloOpcUaServer>> {
    const konektiloSettings = await this.settingsStorageService.getSettings();
    return this.http.get<KonektiloResponse<KonektiloOpcUaServer>>(konektiloSettings.konektiloUrl + '/api/' + this.apiVersion +
      '/browse').toPromise();
  }

  async readNode(opcUaServerBrowseUrl: string): Promise<KonektiloResponse<KonektiloBrowseNode>> {
    return this.http.get<KonektiloResponse<KonektiloBrowseNode>>(opcUaServerBrowseUrl).toPromise();
  }
}
