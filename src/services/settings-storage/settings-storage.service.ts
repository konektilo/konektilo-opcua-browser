import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SettingsStorageService {
  storageKey = 'konektiloSettings';

  constructor(public storage: Storage) {
    this.getSettings().then(subscriptions => {
      if (subscriptions === null) {
        this.storage.set(this.storageKey, {konektiloUrl: undefined, user: undefined, password: undefined, authenticationOn: false});
      }
    });
  }

  async getSettings(): Promise<KonektiloSettings> {
    await this.storage.ready();
    return this.storage.get(this.storageKey);
  }

  async saveSettings(konektiloSettings: KonektiloSettings): Promise<any> {
    await this.storage.ready();
    return this.storage.set(this.storageKey, konektiloSettings);
  }
}
