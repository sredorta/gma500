import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {SignupComponent} from './_authentication/signup/signup.component';
import {LoginComponent} from './_authentication/login/login.component';
import {ResetpasswordComponent} from './_authentication/resetpassword/resetpassword.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProfileComponent} from './_authentication/profile/profile.component';
import {MembersComponent} from './members/members.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'resetpassword',
    component: ResetpasswordComponent
  }, 
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  }, 
  {
    path: 'members',
    component: MembersComponent
  },     
  {
    path: 'productlist',
    component: ProductListComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
