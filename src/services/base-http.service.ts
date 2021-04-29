import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

  constructor(public toastController: ToastController) {
  }

  async showToast(error: any) {
    console.log(error);
    let errorMessage = `Error: ${error.message}`;

    if (error?.error?.description !== undefined && error?.error?.messages !== undefined) {
      errorMessage = error.error.description + ', message(s): ' + error.error.messages.join(', ');
    } else if (error.error.description !== undefined) {
      errorMessage = error.error.description;
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status === 420) {
      errorMessage = 'You have to accept konektilo license agreement before you can use konektilo!';
    }

    const toast = await this.toastController.create({
      message: 'HTTP request failed: ' + errorMessage,
      duration: 5000,
      position: 'top'
    });
    await toast.present();
  }
}
