import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sellerSignup } from '../shared/data-types';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor( private http:HttpClient) { }

  sellerSignup(data:sellerSignup){
    return this.http.post(`http://localhost:3000/seller`,data);
  }
}
