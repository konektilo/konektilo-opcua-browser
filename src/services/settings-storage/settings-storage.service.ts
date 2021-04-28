import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SettingsStorageService {
  settingsStorageKey = 'konektiloSettings';
  tokenStorageKey = 'token';

  constructor(public storage: Storage) {
    this.storage.ready().then(_ => {
      this.getSettings().then(settings => {
        if (settings === null) {
          this.storage.set(this.settingsStorageKey,
            {konektiloUrl: undefined, user: undefined, password: undefined, authenticationOn: false});
        }
      });

      this.getSettings().then(token => {
        if (token === null) {
          this.storage.set(this.tokenStorageKey, undefined);
        }
      });
    });
  }

  async getSettings(): Promise<KonektiloSettings> {
    await this.storage.ready();
    return this.storage.get(this.settingsStorageKey);
  }

  async saveSettings(konektiloSettings: KonektiloSettings): Promise<any> {
    await this.storage.ready();

    // Delete token if auth is disabled
    if (konektiloSettings.authenticationOn === false) {
      await this.saveToken(undefined);
    }

    return this.storage.set(this.settingsStorageKey, konektiloSettings);
  }

  async getToken(): Promise<string> {
    await this.storage.ready();
    return this.storage.get(this.tokenStorageKey);
  }

  async saveToken(token: string): Promise<any> {
    await this.storage.ready();
    return this.storage.set(this.tokenStorageKey, token);
  }
}
