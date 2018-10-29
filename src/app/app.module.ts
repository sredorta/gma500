import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { DeviceDetectorModule } from 'ngx-device-detector';

import {FormBuilder, FormGroup, FormControl,ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Material design
import {MatIconRegistry} from '@angular/material';
import {MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//Directives
import { OnlyNumberDirective } from './_directives/onlyNumber.directive';
//Modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './_authentication/login/login.component';
import { ResetpasswordComponent } from './_authentication/resetpassword/resetpassword.component';
import { SignupComponent } from './_authentication/signup/signup.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './_common/footer/footer.component';
import { HttpService } from './_services/http.service';
import { UserService } from './_services/user.service';
import {ErrorInterceptor} from './_helpers/error.interceptor';
//import {FakeBackendInterceptor} from './_helpers/fake-backend.interceptor';
import {HttpHeaderInterceptor} from './_helpers/http-header-interceptor';
import { MessageComponent } from './_library/message/message.component';
import { InputImageComponent } from './_library/input-image/input-image.component';
import { TermsDialogComponent } from './_authentication/terms-dialog/terms-dialog.component';
import { ProfileComponent } from './_authentication/profile/profile.component';
import { MembersComponent } from './members/members.component';
import { MemberItemComponent } from './_library/member-item/member-item.component';
import { ProfileDialogComponent } from './_dialogs/profile-dialog/profile-dialog.component';
import { ProductsComponent } from './products/products.component';
import { ProductItemComponent } from './_library/product-item/product-item.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductService } from './_services/product.service';
import { ConfigService } from './_services/config.service';
import { ProfileEditComponent } from './_authentication/profile-edit/profile-edit.component';
import { AccountRemoveDialogComponent } from './_authentication/account-remove-dialog/account-remove-dialog.component';
import { NotifItemComponent } from './_notifs/notif-item/notif-item.component';
import { NotifsComponent } from './_notifs/notifs/notifs.component';
import { NiceDateFormatPipe } from './_pipes/nice-date-format.pipe';


@NgModule({
  declarations: [
    OnlyNumberDirective,
    AppComponent,
    HomeComponent,
    LoginComponent,
    ResetpasswordComponent,
    SignupComponent,
    AboutComponent,
    FooterComponent,
    MessageComponent,
    InputImageComponent,
    TermsDialogComponent,
    ProfileComponent,
    MembersComponent,
    MemberItemComponent,
    ProfileDialogComponent,
    ProductsComponent,
    ProductItemComponent,
    ProductDetailsComponent,
    ProfileEditComponent,
    AccountRemoveDialogComponent,
    NotifItemComponent,
    NotifsComponent,
    NiceDateFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    DeviceDetectorModule.forRoot(),
    ReactiveFormsModule,
    [  MatAutocompleteModule,
      MatBadgeModule,
      MatBottomSheetModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatCardModule,
      MatCheckboxModule,
      MatChipsModule,
      MatDatepickerModule,
      MatDialogModule,
      MatDividerModule,
      MatExpansionModule,
      MatGridListModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      MatNativeDateModule,
      MatPaginatorModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      MatRippleModule,
      MatSelectModule,
      MatSidenavModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatSnackBarModule,
      MatSortModule,
      MatStepperModule,
      MatTableModule,
      MatTabsModule,
      MatToolbarModule,
      MatTooltipModule,
      MatTreeModule],          
  ],
  entryComponents: [TermsDialogComponent, AccountRemoveDialogComponent, ProfileDialogComponent],
  providers: [
    HttpService, ConfigService, UserService, ProductService,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, 
    {provide: HTTP_INTERCEPTORS, useClass: HttpHeaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
