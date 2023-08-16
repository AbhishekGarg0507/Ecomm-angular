import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { sellerSignup } from '../shared/data-types';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  genders = ['Male','Female'];

  constructor(private seller:SellerService,
    private router:Router){}

  onSubmit(data:sellerSignup):void {
    
    this.seller.sellerSignup(data).subscribe((result) =>{
      if(result){
        this.router.navigate(['/seller-home']);
      }
    });
  }
}
