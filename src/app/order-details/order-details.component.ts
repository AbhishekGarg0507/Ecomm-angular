import { Component, OnInit } from '@angular/core';
import { cart, order, priceSummary } from '../shared/data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  priceSummary:priceSummary = {
    subtotal:0,
    tax:0,
    discount:0,
    delivery:0,
    total:0
  };
  cartData:cart[] | undefined ;
  cartItems:number = 0;
  orderData:order[]|undefined ;
  constructor(private product:ProductService){}

  ngOnInit(): void {
      
    this.product.orderList().subscribe((result)=>{
      this.orderData= result;
    })
    this.product.currentCart().subscribe((result)=>{
      this.cartData = result;
      this.cartItems = this.cartData.length;
      
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
      
    })
  }
}
