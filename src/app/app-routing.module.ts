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
import {AdminMembersComponent} from './_admin/admin-members/admin-members.component';
import {AdminProductsComponent} from './_admin/admin-products/admin-products.component';
import {RolesAdminComponent} from './_admin/roles-admin/roles-admin.component';
import {GroupsAdminComponent} from './_admin/groups-admin/groups-admin.component';
import {NotifsComponent} from './_notifs/notifs/notifs.component';
import {ProductDetailsComponent} from './product-details/product-details.component';

//Guards
import { LoggedInGuard } from './_guards/logged-in.guard';
import { LoggedOutGuard } from './_guards/logged-out.guard';
import { AlwaysAuthGuard} from './_guards/always-auth.guard';
import { AdminGuard} from './_guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AlwaysAuthGuard]
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
    component: AboutComponent,
    canActivate: [AlwaysAuthGuard]
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
    component: MembersComponent,
    canActivate: [AlwaysAuthGuard]
  },
  {
    path: 'admin-members',
    component: AdminMembersComponent,
    canActivate: [AdminGuard]
  },  
  {
    path: 'admin-roles',
    component: RolesAdminComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin-groups',
    component: GroupsAdminComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin-products',
    component: AdminProductsComponent,
    canActivate: [AdminGuard]
  },     
  {
    path: 'materiel',
    component: ProductsComponent
  },
  {
    path: 'materiel-details/:id',
    component: ProductDetailsComponent,
    canActivate: [LoggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
