import { Component, OnInit } from '@angular/core';
import { cart, order, priceSummary } from '../shared/data-types';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

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
  orderData
  orderId:number;
  constructor(private product:ProductService,
    private activeRoute:ActivatedRoute){}

    ngOnInit(): void {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    this.orderId = parseInt(id);
    
    this.product.order(this.orderId).subscribe((result)=>{
      console.log(result);
      this.orderData = result;
      this.priceSummary.subtotal = this.orderData.subtotal;
      this.priceSummary.discount = this.orderData.subtotal/10;
      
      this.priceSummary.delivery = 100;

      let Tax = Math.round( this.orderData.subtotal * (12/100))
      this.priceSummary.tax = Tax;
      

    })
      
    // this.product.currentCart().subscribe((result)=>{
    //   this.cartData = result;
    //   this.cartItems = this.cartData.length;
      
    //   let price = 0;
    //   result.forEach((item)=>{
    //     if(item.quantity){
    //       price = price+ (+item.productPrice * +item.quantity) ;
    //     }
    //   });
    //   this.priceSummary.subtotal = price;
    
    
      
    //   this.priceSummary.total = price + Tax + 100 - (price/10);
      
    // })
  }
}
