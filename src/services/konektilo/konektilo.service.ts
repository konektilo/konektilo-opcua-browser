import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {KonektiloNodeResponse} from '../../models/KonektiloNodeResponse';
import {catchError} from 'rxjs/operators';
import {ToastController} from '@ionic/angular';
import {BaseHttpService} from '../base-http.service';

@Injectable({
  providedIn: 'root'
})
export class KonektiloService extends BaseHttpService {
  constructor(public http: HttpClient, public toastController: ToastController) {
    super(toastController);
  }

  async readNode(accessUrl: string): Promise<KonektiloNodeResponse> {
    return this.http.get<KonektiloNodeResponse>(accessUrl)
      .pipe(
        catchError(error => {
          this.showToast(error);

          return [];
        })
      ).toPromise();
  }
}
