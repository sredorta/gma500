import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {SignupComponent} from './_authentication/signup/signup.component';
import {LoginComponent} from './_authentication/login/login.component';
import {ResetpasswordComponent} from './_authentication/resetpassword/resetpassword.component';
import {ProductsComponent} from './products/products.component';
import {ProfileComponent} from './_authentication/profile/profile.component';
import {ProfileEditComponent} from './_authentication/profile-edit/profile-edit.component';
import {MembersComponent} from './_members/members/members.component';
import {NotifsComponent} from './_notifs/notifs/notifs.component';
import {ProductDetailsComponent} from './product-details/product-details.component';

import { LoggedInGuard } from './_guards/logged-in.guard';
import { LoggedOutGuard } from './_guards/logged-out.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [LoggedOutGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedOutGuard]
  },
  {
    path: 'resetpassword',
    component: ResetpasswordComponent,
    canActivate: [LoggedOutGuard]
  }, 
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [LoggedInGuard]
  }, 
  {
    path: 'editprofile',
    component: ProfileEditComponent,
    canActivate: [LoggedInGuard]
  }, 
  {
    path: 'notifications',
    component: NotifsComponent,
    canActivate: [LoggedInGuard]
  },   
  {
    path: 'members',
    component: MembersComponent
  },     
  {
    path: 'materiel',
    component: ProductsComponent
  },
  {
    path: 'materiel-details/:id',
    component: ProductDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
