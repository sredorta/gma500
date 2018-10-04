import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
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
import {ErrorInterceptor} from './_helpers/error.interceptor';
import {FakeBackendInterceptor} from './_helpers/fake-backend.interceptor';



@NgModule({
  declarations: [
    OnlyNumberDirective,
    AppComponent,
    HomeComponent,
    LoginComponent,
    ResetpasswordComponent,
    SignupComponent,
    AboutComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
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
  providers: [HttpService, {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, {provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
