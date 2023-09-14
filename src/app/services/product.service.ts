import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { product } from '../shared/data-types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();
  constructor(private http:HttpClient) { }

  product(data:product){
    return this.http.post('http://localhost:3000/products',data);
  }

  productList(){
    return this.http.get<product[]>('http://localhost:3000/products');
  }

  deleteproduct(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id:string){
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(product:product){
    return this.http.put<product>(`http://localhost:3000/products/${product.id}`,product);
  }

  getpopularProducts(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3');
  }

  trendyProducts(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=6');
  }

  searchProduct(query:string){
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`);
  }

  localAddToCart(data:product){
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]));
    }else{
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart',JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  removeItemFromCart(productId:number){
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      let items:product[] = JSON.parse(cartData);
      items = items.filter((item:product) => productId != item.id );
      localStorage.setItem('localCart',JSON.stringify(items));
      this.cartData.emit(items);  
      
    }
  }
}
