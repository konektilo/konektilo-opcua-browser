import {Component} from '@angular/core';
import {KonektiloOpcUaServer} from '../../models/KonektiloOpcUaServer';
import {KonektiloBrowserService} from '../../services/konektilo-browser/konektilo-browser.service';
import {SettingsStorageService} from '../../services/settings-storage/settings-storage.service';
import {ToastController} from '@ionic/angular';
import {AuthenticationService} from '../../services/auth-service/authentication.service';

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
  authenticationOn = false;

  konektiloSettings: KonektiloSettings;

  constructor(public toastController: ToastController,
              public konektiloBrowser: KonektiloBrowserService,
              public settingsStorage: SettingsStorageService,
              public authenticationService: AuthenticationService) {
    this.settingsStorage.getSettings().then(konektiloSettings => {
      this.konektiloSettings = konektiloSettings;
      this.authenticationOn = konektiloSettings.authenticationOn;
      this.konektiloUserInput = konektiloSettings.user;
      this.konektiloPasswordInput = konektiloSettings.password;

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
    this.konektiloSettings.authenticationOn = this.authenticationOn;
    await this.settingsStorage.saveSettings(this.konektiloSettings);

    await this.connectToKonektilo();
  }

  async connectToKonektilo() {
    this.opcUaServer = [];
    let loginResp = {loginSuccessful: false, errorMessage: ''};

    if (this.konektiloSettings.authenticationOn === true) {
      loginResp = await this.authenticationService.login();
      await this.showLoginStatus(loginResp);
    }

    // If login is enabled and fails, don't connect to konektilo
    if (this.konektiloSettings.authenticationOn === true && loginResp.loginSuccessful === false) {
      return;
    }

    this.konektiloBrowser.readOpcUaServer().then(konektiloResponse => {
      this.connectionSuccessful = true;
      Object.keys(konektiloResponse.result).forEach(opcUaServer => this.opcUaServer.push(konektiloResponse.result[opcUaServer]));
      this.showConnectionStatus('').then();
    }).catch(error => {
      this.connectionSuccessful = false;
      this.showConnectionStatus(error?.statusText).then();
    });
  }

  async showLoginStatus(loginResp: LoginResponse) {
    let message;

    if (loginResp.loginSuccessful === true) {
      message = 'Login successful';
    } else {
      message = 'Could not login: ' + loginResp.errorMessage;
    }

    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top'
    });
    await toast.present();
  }

  async showConnectionStatus(errorMessage: string) {
    let message;

    if (this.connectionSuccessful) {
      message = 'Connected successfully, found ' + this.opcUaServer.length + ' OPC-UA server(s)';
    } else {
      message = 'Could not connect to konektilo: ' + errorMessage;
    }

    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top'
    });
    await toast.present();
  }
}
