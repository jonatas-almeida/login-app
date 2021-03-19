import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(localStorage.getItem('token') !== null){
      const cloneReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      });
      return next.handle(cloneReq).pipe(
        tap(
          succ => {},
          error => {
            if(error.status == 401){
              this.router.navigateByUrl('/');
            }
          }
        )
      )
    }
    else{
      return next.handle(request.clone());
    }
  }
}
