import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SettingsStorageService} from '../settings-storage/settings-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(public http: HttpClient, public settingsStorage: SettingsStorageService) {
  }

  async login(): Promise<LoginResponse> {
    const loginResp = {loginSuccessful: false, errorMessage: ''};

    const konektiloSettings = await this.settingsStorage.getSettings();
    const user = {username: konektiloSettings.user, password: konektiloSettings.password};

    await this.http.post<User>(konektiloSettings.konektiloUrl + '/api/v1/authenticate', user).toPromise().then(userResp => {
      if (userResp.token !== undefined) {
        loginResp.loginSuccessful = true;
        this.settingsStorage.saveToken(userResp.token);
      }
    }).catch(error => {
      loginResp.errorMessage = error?.error?.message;
    });

    return loginResp;
  }
}
