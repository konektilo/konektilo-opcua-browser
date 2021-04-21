import {Component} from '@angular/core';
import {KonektiloOpcUaServer} from '../../models/KonektiloOpcUaServer';
import {KonektiloBrowserService} from '../../services/konektilo-browser/konektilo-browser.service';
import {SettingsStorageService} from '../../services/settings-storage/settings-storage.service';
import {ToastController} from '@ionic/angular';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  opcUaServer: KonektiloOpcUaServer[] = [];
  connectionSuccessful = false;

  konektiloUrlInput: string;
  konektiloUserInput: string;
  konektiloPasswordInput: string;

  konektiloSettings: KonektiloSettings;

  constructor(public toastController: ToastController,
              public konektiloBrowser: KonektiloBrowserService,
              public settingsStorageService: SettingsStorageService) {
    this.settingsStorageService.getSettings().then(konektiloSettings => {
      this.konektiloSettings = konektiloSettings;
      if (konektiloSettings.konektiloUrl === undefined) {
        this.konektiloUrlInput = 'http://localhost:80';
      } else {
        this.konektiloUrlInput = konektiloSettings.konektiloUrl;
      }
      this.connectToKonektilo();
    });
  }

  async saveAndConnectToKonektilo() {
    this.konektiloSettings.konektiloUrl = this.konektiloUrlInput;
    this.konektiloSettings.user = this.konektiloUserInput;
    this.konektiloSettings.password = this.konektiloPasswordInput;
    await this.settingsStorageService.saveSettings(this.konektiloSettings);

    this.connectToKonektilo();
  }

  connectToKonektilo() {
    this.opcUaServer = [];

    // @ts-ignore
    this.konektiloBrowser.readOpcUaServer(this.konektiloUrlInput).pipe(catchError(error => {
      this.showConnectionStatus(false, error?.statusText).then();
    })).subscribe(konektiloResponse => {
      this.connectionSuccessful = true;
      // @ts-ignore
      Object.keys(konektiloResponse.result).forEach(opcuaServer => this.opcUaServer.push(konektiloResponse.result[opcuaServer]));
      this.showConnectionStatus(true, '').then();
    });
  }

  async showConnectionStatus(successful: boolean, errorMessage: string) {
    let message;

    if (successful) {
      message = 'Connected successfully, found ' + this.opcUaServer.length + ' OPC-UA server(s)';
    } else {
      message = 'Could not connect to konektilo: ' + errorMessage;
    }

    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    await toast.present();
  }
}
