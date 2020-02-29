import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AppService } from '../app.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private appService: AppService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.appService.startRequest();
    return next.handle(req).pipe(finalize(() => {
      this.appService.finishRequest();
    }));
  }
}
