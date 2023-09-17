import { order } from './../shared/data-types';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orderData:order[]|undefined ;
  constructor(private product:ProductService,
    private router:Router){}
  orderDetails;

  ngOnInit(): void {
    this.getOrderList();
  }

  cancelOrder(orderId:number | undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      this.getOrderList();
    })
  }

  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.orderData= result;
    })
  }

  viewOrder(orderId){
    orderId && this.product.order(orderId).subscribe((result)=>{
      this.orderDetails = result;
      this.router.navigate(['/order-details/'+this.orderDetails.id])
    })
  }
}
