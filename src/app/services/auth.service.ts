import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = "http://localhost:3000/user";
  jwtHelper= new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) { }

  login(model: User){
    return this.http.post(`${this.loginUrl}`, model).pipe(
      map((response: any) => {
        const user = response;

        console.log(response)

        if(user){
          localStorage.setItem('token', user);
          this.decodedToken = this.jwtHelper.decodeToken(user);
        }
      })
    )
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
