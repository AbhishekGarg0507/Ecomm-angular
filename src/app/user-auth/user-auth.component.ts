import { Component, OnInit } from '@angular/core';
import { cart, product, userLogin, userSignup } from '../shared/data-types';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit{
  genders = ['Male','Female'];
  showloginForm:boolean = false;
  AuthError:string = "";

  constructor(private userservice:UserService, private product:ProductService){}

  ngOnInit(): void {
    this.userservice.userAuthReload();
  }

  Signup(form:userSignup){
    this.userservice.newUser(form);
  }

  Login(data:userLogin){
    this.userservice.userlogin(data);
    this.userservice.invalidUserAuth.subscribe((result)=>{
      // console.warn("login result" , result);
      if(result){
        this.AuthError = "Please enter valid user details";
      }else{
        this.localCartToRemoteCart();
      }
    })
  }

  openLogin(){
    this.showloginForm = false;
  }
  openSignup(){
    this.showloginForm = true;
  }

  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    if(data){
      let cartDataList:product[] = JSON.parse(data);
      let user = localStorage.getItem('user');
      let userId= user && JSON.parse(user).id;
      console.log(userId);
      
      cartDataList.forEach((product:product,index) => {
        let cartData:cart = {
          ...product,
          productId:product.id,
          userId
        };

        delete cartData.id;

        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result)=>{
            if(result){
              console.warn("item stored in DB");
            }
          })
          if(cartDataList.length === index+1){
            localStorage.removeItem('localCart');
          }

        }, 500);
        


      });
    }
  }
}
