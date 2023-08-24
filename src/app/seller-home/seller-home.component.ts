import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../shared/data-types';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit{
  productList: product []
  constructor(private productservice:ProductService){}
  ngOnInit(): void {
    this.productservice.productList().subscribe((result)=>{
      this.productList = result;
    })
  }

  
  
}
