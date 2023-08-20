import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { sellerLogin, sellerSignup } from '../shared/data-types';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  genders = ['Male','Female'];
  showloginForm:boolean = false;
  AuthError:string = "";
  constructor(private seller:SellerService,
    private router:Router){}
  
  ngOnInit(): void {
    this.seller.reloadSeller();
    
  }

  Signup(data:sellerSignup):void {
    this.seller.sellerSignup(data);
  }

  Login(data:sellerLogin):void {
    this.seller.sellerLogin(data);

    this.seller.loginError.subscribe((isError) =>{
      if(isError){
        this.AuthError = "Email or Password is invalid";
      }
    })
    
  }

  openLogin(){
    this.showloginForm = false;
  }
  openSignup(){
    this.showloginForm = true;
  }

}
