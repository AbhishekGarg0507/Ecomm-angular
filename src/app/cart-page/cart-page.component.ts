import { priceSummary } from './../shared/data-types';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart } from '../shared/data-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit{
  cartData:cart[] | undefined ;

  priceSummary:priceSummary = {
    subtotal:0,
    tax:0,
    discount:0,
    delivery:0,
    total:0
  };

  constructor(private product:ProductService,
    private router:Router){}
  ngOnInit(): void {
    this.product.currentCart().subscribe((result)=>{
      this.cartData = result;

      let price = 0;
      result.forEach((item)=>{
        if(item.quantity){
          price = price+ (+item.productPrice * +item.quantity) ;
        }
      });
      this.priceSummary.subtotal = price;
      this.priceSummary.discount = price/10;
      let Tax = Math.round( price * (12/100))
      this.priceSummary.tax = Tax;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + Tax + 100 - (price/10);
      
    });
  }

  checkout(){
    this.router.navigate(['checkout']);
  }
}
