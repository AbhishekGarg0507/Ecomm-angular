import { Component } from '@angular/core';
import { userLogin, userSignup } from '../shared/data-types';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  genders = ['Male','Female'];
  showloginForm:boolean = false;
  AuthError:string = "";

  constructor(private userservice:UserService){}

  Signup(form:userSignup){
    this.userservice.newUser(form);
    // console.warn(form);
    
  }
  Login(val:userLogin){
    console.error(val);
    
  }
  openLogin(){
    this.showloginForm = false;
  }
  openSignup(){
    this.showloginForm = true;
  }
}
