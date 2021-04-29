import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SettingsStorageService {
  settingsStorageKey = 'konektiloSettings';
  tokenStorageKey = 'token';

  constructor(public storage: Storage) {
  }

  async getSettings(): Promise<KonektiloSettings> {
    await this.storage.ready();
    let konektiloSettings = await this.storage.get(this.settingsStorageKey);

    if (konektiloSettings === null) {
      await this.storage.set(this.settingsStorageKey,
        {konektiloUrl: undefined, user: undefined, password: undefined, authenticationOn: false});
      konektiloSettings = await this.storage.get(this.settingsStorageKey);
    }

    return konektiloSettings;
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
    let token = await this.storage.get(this.tokenStorageKey);

    if (token === null) {
      await this.storage.set(this.tokenStorageKey, undefined);
      token = undefined;
    }

    return token;
  }

  async saveToken(token: string): Promise<any> {
    await this.storage.ready();
    return this.storage.set(this.tokenStorageKey, token);
  }
}
