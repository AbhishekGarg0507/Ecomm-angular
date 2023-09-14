import { product, sellerLogin } from './../shared/data-types';
import { Component, OnInit } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType:string = 'default';
  sellerName:string = '';
  userName:string = '';
  searchResult:undefined|product[];
  cartItems:number = 0;
  constructor(private router : Router,private product:ProductService){}
  ngOnInit(): void {
    
    this.router.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          console.log('in seller page');
          this.menuType = 'seller';
          if(localStorage.getItem('seller')){
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            console.log(sellerData.username);
            
            this.sellerName = sellerData.username ;
          }
          }else if(localStorage.getItem('user')){
            let userStore = localStorage.getItem('user');
            let userData = userStore && JSON.parse(userStore);
            this.userName = userData.username;
            this.menuType = 'user';
        }
        else{
          this.menuType = 'default';
        }
      }
    });


    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItems = JSON.parse(cartData).length;
    } 
    this.product.cartData.subscribe((items) =>{
      this.cartItems = items.length;
    })
  }

  selerlogout(){
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }
  userlogout(){
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
  

  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result) =>{
        if(result.length>5){
          result.length = 5; 
        }
        this.searchResult = result;
      });
    }
  }
  emptySearch(){
    this.searchResult = undefined;
  }
  submitSearch(val:string){
    this.router.navigate([`/search/${val}`]);
  }
  redirectToDetail(id:number){
    this.router.navigate([`details/${id}`]);
  }
}
