import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../shared/data-types';


@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit{
  productList: product [];
  deleteMsg:string;
  constructor(private productservice:ProductService){}
  ngOnInit(): void {
   this.list();
  }

  deleteProduct(id:number){
    this.productservice.deleteproduct(id).subscribe((result)=>{
      if(result){
        this.deleteMsg = "Product is deleted";
        this.list();
      }
    })
    setTimeout(()=> (this.deleteMsg=undefined),2000);
  }
  updateProduct(){
    
  }
  list(){
    this.productservice.productList().subscribe((result)=>{
      this.productList = result;
    })
  }
  
  
}
