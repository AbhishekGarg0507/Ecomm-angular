import { Injectable } from '@angular/core';
import { userLogin, userSignup } from '../shared/data-types';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private router:Router) { }

  newUser(user:userSignup){
    this.http.post("http://localhost:3000/users",user,{observe:"response"})
    .subscribe((result) =>{
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body));
        this.router.navigate(['/']);
      }
    })
    
  }

  userlogin(data:userLogin){
    console.log(data);
    this.http
    .get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
    {observe:'response'})
    .subscribe((result:any)=>{
      if(result && result.body){
        localStorage.setItem('user',JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
      }
    })
    
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }
}
