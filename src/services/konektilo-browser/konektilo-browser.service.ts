import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {KonektiloOpcUaServer} from '../../models/KonektiloOpcUaServer';
import {KonektiloResponse} from '../../models/KonektiloResponse';
import {SettingsStorageService} from '../settings-storage/settings-storage.service';
import {BaseHttpService} from '../base-http.service';
import {ToastController} from '@ionic/angular';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KonektiloBrowserService extends BaseHttpService {
  apiVersion = 'v1';

  constructor(public http: HttpClient, public settingsStorageService: SettingsStorageService, public toastController: ToastController) {
    super(toastController);
  }

  async readOpcUaServer(): Promise<KonektiloResponse<KonektiloOpcUaServer>> {
    const konektiloSettings = await this.settingsStorageService.getSettings();
    return this.http.get<KonektiloResponse<KonektiloOpcUaServer>>(konektiloSettings.konektiloUrl + '/api/' + this.apiVersion +
      '/browse').pipe(
      catchError(error => {
        this.showToast(error);

        return [];
      })
    ).toPromise();
  }

  async readNode(opcUaServerBrowseUrl: string): Promise<KonektiloResponse<KonektiloBrowseNode>> {
    return this.http.get<KonektiloResponse<KonektiloBrowseNode>>(opcUaServerBrowseUrl).pipe(
      catchError(error => {
        this.showToast(error);

        return [];
      })
    ).toPromise();
  }
}
