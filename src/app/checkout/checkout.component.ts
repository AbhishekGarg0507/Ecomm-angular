import { billingInfo, userLogin } from './../shared/data-types';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, order, priceSummary } from '../shared/data-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  
  priceSummary:priceSummary = {
    subtotal:0,
    tax:0,
    discount:0,
    delivery:0,
    total:0
  };
  cartData:cart[] | undefined ;
  cartItems:number = 0;
  orderMsg:string = 'Your order has been placed';
  constructor( private product:ProductService,private router:Router){}

  ngOnInit(): void {
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
billingDetails(data:billingInfo){
  let user = localStorage.getItem('user');
  let userId = user && JSON.parse(user).id;

  if(this.priceSummary.total){
    let orderData:order = {
      ...data,
      totalPrice : this.priceSummary.total,
      subtotal : this.priceSummary.subtotal,
      userId,
      id:undefined
    }

    this.cartData.forEach((item)=>{
      setTimeout(() => {
        item.id && this.product.deleteCartItem(item.id);
      }, 500);
    })

    this.product.orderNow(orderData).subscribe((result) =>{
      if(result){
        alert(this.orderMsg);
        this.router.navigate(['/my-orders']);
      }
      
    })
  }
}
}