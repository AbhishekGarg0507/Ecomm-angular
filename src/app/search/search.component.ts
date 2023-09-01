import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../shared/data-types';
import { Expo, gsap } from 'gsap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  searchResult:undefined|product[];
  text: any;
  constructor( private activeRoute:ActivatedRoute ,private product:ProductService){}

  ngOnInit(): void {
    this.text = this.activeRoute.snapshot.paramMap.get('query');
    console.error(this.activeRoute.snapshot.paramMap.get('query'));
    
    this.text && this.product.searchProduct(this.text).subscribe((result) =>{
      this.searchResult = result;
      console.warn(this.text);
    });

    
  }

  
  
}
