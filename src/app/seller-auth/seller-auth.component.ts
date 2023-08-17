import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { sellerSignup } from '../shared/data-types';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  genders = ['Male','Female'];
  showloginForm:boolean = false;
  constructor(private seller:SellerService,
    private router:Router){}
  
  ngOnInit(): void {
    this.seller.reloadSeller();
    
  }

  onSubmit(data:sellerSignup):void {
    this.seller.sellerSignup(data);
  }

  openLogin(){
    this.showloginForm = true;
  }
  openSignup(){
    this.showloginForm = false;
  }

}
