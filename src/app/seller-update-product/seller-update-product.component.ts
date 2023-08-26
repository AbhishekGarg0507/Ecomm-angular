import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../shared/data-types';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit{
  productData:undefined | product;
  updateProductMsg:string;

  constructor(private route:ActivatedRoute,
    private productservice:ProductService,
    private router:Router){}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.log(productId);
    productId && this.productservice.getProduct(productId).subscribe((data)=>{
      this.productData = data;
    })
    
  }

  submit(data:product){
    console.log(data);
    if(this.productData){
      data.id = this.productData.id;
    }
    this.productservice.updateProduct(data).subscribe((result) =>{
      if(result){
        this.updateProductMsg = "Product Updated....";
        
      }
    });
    setTimeout(()=>{
      this.updateProductMsg = undefined;
      this.router.navigate(['/seller-home']);
    },2000);
    
  }

}
