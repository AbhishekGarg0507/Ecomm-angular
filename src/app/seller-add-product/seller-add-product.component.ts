import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../shared/data-types';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addProductMsg:string | undefined;
  constructor(private productService:ProductService){}

  addProduct(Data:product){
    this.productService.product(Data).subscribe((result) =>{
      console.log(result);
      if(result){
        this.addProductMsg = "Product is successfully added";
      }setTimeout(()=> (this.addProductMsg=undefined),3000);
      
    })
    
  }
}
