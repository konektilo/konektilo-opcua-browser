import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

  constructor(public toastController: ToastController) {
  }

  async showToast(errorMessage: string) {
    const toast = await this.toastController.create({
      message: 'HTTP request failed: ' + errorMessage,
      duration: 5000,
      position: 'top'
    });
    await toast.present();
  }
}
