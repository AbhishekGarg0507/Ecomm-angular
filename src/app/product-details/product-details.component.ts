import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../shared/data-types';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  detailProduct:undefined | product ;
  productQuantity:number = 1;
  constructor(private activeRoute:ActivatedRoute, private productsrvice:ProductService){}
  ngOnInit(): void {
    let id = this.activeRoute.snapshot.paramMap.get('productId');
    // console.warn(id);
    id && this.productsrvice.getProduct(id).subscribe((result)=>{
      // console.error(result);
      this.detailProduct = result;
    })
    
    
  }
  handleQuantity(val:string){
    if(this.productQuantity<20 && val=='max'){
      this.productQuantity += 1;
    }
    else if(this.productQuantity>1 && val=='min'){
      this.productQuantity -= 1;
    }
  }
  
}
