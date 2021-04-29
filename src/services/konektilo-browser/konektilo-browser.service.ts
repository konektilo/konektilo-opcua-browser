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
        let errorMessage: string;

        if (error?.error?.description !== undefined && error?.error?.messages !== undefined) {
          errorMessage = error.error.description + ', message(s): ' + error.error.messages.join(', ');
        } else if (error.error.description !== undefined) {
          errorMessage = error.error.description;
        } else if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;

        } else {
          errorMessage = `Error: ${error.message}`;
        }

        this.showToast(errorMessage);

        return [];
      })
    ).toPromise();
  }

  async readNode(opcUaServerBrowseUrl: string): Promise<KonektiloResponse<KonektiloBrowseNode>> {
    return this.http.get<KonektiloResponse<KonektiloBrowseNode>>(opcUaServerBrowseUrl).pipe(
      catchError(error => {
        let errorMessage: string;

        if (error?.error?.description !== undefined && error?.error?.messages !== undefined) {
          errorMessage = error.error.description + ', message(s): ' + error.error.messages.join(', ');
        } else if (error.error.description !== undefined) {
          errorMessage = error.error.description;
        } else if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;

        } else {
          errorMessage = `Error: ${error.message}`;
        }

        this.showToast(errorMessage);

        return [];
      })
    ).toPromise();
  }
}
