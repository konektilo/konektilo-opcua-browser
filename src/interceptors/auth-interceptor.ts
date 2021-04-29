import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent, HttpUserEvent
} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {SettingsStorageService} from '../services/settings-storage/settings-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public settingsStorage: SettingsStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler): Promise<HttpSentEvent | HttpHeaderResponse | HttpResponse<any> | HttpProgressEvent
    | HttpUserEvent<any>> {
    const token = await this.settingsStorage.getToken();

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      return next.handle(cloned).toPromise();
    } else {
      return next.handle(req).toPromise();
    }
  }
}
