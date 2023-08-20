import { sellerLogin } from './../shared/data-types';
import { Component, OnInit } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType:string = 'default';
  constructor(private router : Router){}
  ngOnInit(): void {
    
    this.router.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          console.log('in seller page');
          this.menuType = 'seller';
        }else{
          console.log('outside seller');
          this.menuType = 'default';
        }
      }
    })
  }

}
