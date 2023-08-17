import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sellerSignup } from '../shared/data-types';
import { BehaviorSubject } from 'rxjs';
import {  Router  } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  constructor( private http:HttpClient,private route:Router) { }

  sellerSignup(data:sellerSignup){
    this.http
    .post('http://localhost:3000/seller',data,{observe:'response'})
    .subscribe((result)=>{
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller',JSON.stringify(result.body));
      this.route.navigate(['seller-home']);
      console.log(result);
      
    });
    return false;
  }
}
