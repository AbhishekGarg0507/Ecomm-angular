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
  sellerName:string = '';
  constructor(private router : Router){}
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
        }else{
          this.menuType = 'default';
        }
      }
    })
  }

  logout(){
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

}
