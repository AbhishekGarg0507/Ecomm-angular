import { Component, OnInit } from '@angular/core';
import { userLogin, userSignup } from '../shared/data-types';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit{
  genders = ['Male','Female'];
  showloginForm:boolean = false;
  AuthError:string = "";

  constructor(private userservice:UserService){}

  ngOnInit(): void {
    this.userservice.userAuthReload();
  }

  Signup(form:userSignup){
    this.userservice.newUser(form);
  }

  Login(val:userLogin){
    this.userservice.userlogin(val);
  }

  openLogin(){
    this.showloginForm = false;
  }
  openSignup(){
    this.showloginForm = true;
  }
}
