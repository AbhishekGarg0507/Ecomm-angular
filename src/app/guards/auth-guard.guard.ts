import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SellerService } from '../services/seller.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})

export class AuthGuardGuard implements CanActivate{

  constructor(private seller:SellerService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if(localStorage.getItem('seller')){
        return true;
      }
      return this.seller.isSellerLoggedIn;
  }
}
