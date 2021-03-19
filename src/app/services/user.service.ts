import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../interfaces/products';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl="http://localhost:3000/user"
  productUrl="http://localhost:3000/products"

  constructor(private http: HttpClient) { }

  postUser(user: User){
    return this.http.post(`${this.userUrl}`, user);
  }

  postProduct(product: Products, user: User){
    return this.http.post(`${this.productUrl}/${user.id}`, product);
  }
}
