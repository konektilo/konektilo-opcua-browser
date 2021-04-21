import {Component} from '@angular/core';
import {KonektiloOpcUaServer} from '../../models/KonektiloOpcUaServer';
import {KonektiloBrowserService} from '../../services/konektilo-browser/konektilo-browser.service';
import {KonektiloService} from '../../services/konektilo/konektilo.service';
import {SettingsStorageService} from '../../services/settings-storage/settings-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  opcUaServer: KonektiloOpcUaServer[] = [];

  konektiloUrlInput: string;
  konektiloUserInput: string;
  konektiloPasswordInput: string;

  konektiloSettings: KonektiloSettings;

  constructor(public konektiloBrowser: KonektiloBrowserService, public konektilo: KonektiloService,
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
  }

  connectToKonektilo() {
    // TODO show user if connection ok
    this.opcUaServer = [];
    this.konektiloBrowser.readOpcUaServer(this.konektiloUrlInput).subscribe(konektiloResponse => {
      Object.keys(konektiloResponse.result).forEach(opcuaServer => this.opcUaServer.push(konektiloResponse.result[opcuaServer]));
    });
  }
}
