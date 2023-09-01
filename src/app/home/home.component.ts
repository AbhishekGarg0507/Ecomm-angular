import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../shared/data-types';
import { Expo, gsap } from 'gsap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProducts:undefined | product[];
  trendyProducts:undefined | product[];
  constructor(private product:ProductService){}
  
  
  ngOnInit(): void {
    this.product.getpopularProducts().subscribe((data) =>{
      this.popularProducts = data;
    })
    this.product.trendyProducts().subscribe((data) =>{
      this.trendyProducts = data;
    })

    // this is the animation css from the gsap library
    var tl = gsap.timeline({
      repeat: -1
    });
    tl.to(".imgContainer",{
      ease:Expo.easeInOut,
      duration:1,
      width:'100%',
      stagger:2
    },'a')
    .to('.text p',{
      ease:Expo.easeInOut,
      duration:1,
      stagger:2,
      top:0
    },'a')
    .to('.text p',{
      delay:2,
      ease:Expo.easeInOut,
      duration:1,
      stagger:2,
      top:'-100%'
    },'a')




  }
  }


