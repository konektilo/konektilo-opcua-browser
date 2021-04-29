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
