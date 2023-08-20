import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sellerLogin, sellerSignup } from '../shared/data-types';
import { BehaviorSubject } from 'rxjs';
import {  Router  } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  loginError = new EventEmitter(false);
  constructor( private http:HttpClient,private route:Router) { }

  sellerSignup(data:sellerSignup){
    this.http
    .post('http://localhost:3000/seller',data,{observe:'response'})
    .subscribe((result)=>{
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller',JSON.stringify(result.body));
      this.route.navigate(['seller-home']);
    });
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.route.navigate(['seller-home']);
    }
  }

  sellerLogin(data:sellerLogin){
    console.log(data);
    this.http
    .get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    {observe:'response'})
    .subscribe((result:any)=>{
      if(result && result.body && result.body.length){
      localStorage.setItem('seller',JSON.stringify(result.body));
      this.route.navigate(['seller-home']);
      console.log('login success');}
      else{
        console.log('login failed');
        this.loginError.emit(true);
      }
      
    });
  }
}
