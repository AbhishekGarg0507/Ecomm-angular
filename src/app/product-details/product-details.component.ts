import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../shared/data-types';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  detailProduct:undefined | product ;
  productQuantity:number = 1;
  removeCart = false;
  constructor(private activeRoute:ActivatedRoute, private productsrvice:ProductService){}
  
  ngOnInit(): void {
    let id = this.activeRoute.snapshot.paramMap.get('productId');
    // console.warn(id);
    id && this.productsrvice.getProduct(id).subscribe((result)=>{
      // console.error(result);
      this.detailProduct = result;

      let cartData = localStorage.getItem('localCart');
      if(id && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:product) => id == item.id.toString())
        if(items.length){
          this.removeCart = true;
        }else{
          this.removeCart = false;
        }
      }
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

  addToCart(){
    if(this.detailProduct){
      this.detailProduct.quantity = this.productQuantity;
      // console.log(this.detailProduct);
      if(!localStorage.getItem('user')){
        console.log(this.detailProduct);
        this.productsrvice.localAddToCart(this.detailProduct);
        this.removeCart = true;
      }else{
        // console.warn('user is logged in');
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        // console.warn(userId);
        let cartData:cart = {
          ...this.detailProduct,
          productId:this.detailProduct.id,
          userId
        }
        delete cartData.id;
        // console.warn(cartData);
        this.productsrvice.addToCart(cartData).subscribe((result)=>{
          if(result){
              alert("product is added to cart");
          }
          
        });
        
        
      }
    }
  }
  removeFromCart(productId:number){
    this.productsrvice.removeItemFromCart(productId);
    this.removeCart = false;
  }
  
}
