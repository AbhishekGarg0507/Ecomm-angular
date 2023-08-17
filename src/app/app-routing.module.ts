import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  {path:'' , component:HomeComponent},

  {path:'seller-auth' , component:SellerAuthComponent,
    
  },
  {path:'seller-home' , component:SellerHomeComponent,
    canActivate:[AuthGuardGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
