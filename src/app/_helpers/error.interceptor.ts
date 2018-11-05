import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
//import {MatSnackBar} from '@angular/material';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {User} from './../_models/user';
import { UserService } from '../_services/user.service';
import { ErrorSheetComponent } from '../_library/error-sheet/error-sheet.component';

//We intercept all http requests and parse error and return correct error message

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private userService: UserService, private router : Router, private bottomSheet: MatBottomSheet) {}
    
    //Opens bottomsheet with error or success message
    openBottomSheet(type:string, code:number,  message:string): void {
        this.bottomSheet.open(ErrorSheetComponent, {
            data: { type: type,
                    code: code,
                    message: message
                  }
            });
    }

    getText(code:string) {
        let msg = "";
        switch (code) {
            case "password_reset_success": 
                msg = "Un email vous a ete envoyé avec votre nouveau password"
                break;
            case "update_success":
                msg = "Modification prise en compte"
                break;
            case "signup_success":
                msg = "Votre compte a bien été creer, un email vous à été envoyé pour valider votre compte" 
                break;   
                case "validation_failed":
                msg = "Parametres du formulaire incorrectes"
                break;
            case "invalid_email_or_password":
                msg = "Mot de passe ou email incorrect";
                break;
            case "failed_to_create_token": 
                msg = "Impossible de creer un token"
                break;
            case "user_already_registered":
                msg = "Email ou mobile déjà enregistres";
                break;
            case "too_many_logins":
                msg = "Trop d'essais, vous devez attendre une minute";   
                break;
            case "email_not_found":
                msg = "Adresse email non enregistré";
                break;
            case "profile_not_found":
                msg = "Compte utilizateur non trouvé";
                break;
            case "account_exists": 
                msg = "Un compte existe deja, la recuperation du compte est impossible";
                break;
            case "invalid_password":
                msg = "Mot de passe incorrecte";
                break;     
            case "email_not_validated":
                msg = "Vous devez valider votre compte email avant de pouvoir acceder";
                break;  
            case "update_params_error":
                msg = "L'email ou le numero de mobile est peut-etre déjà enregistré dans la base de donnees"; 
                break;    
            case "Token has expired":
                msg = "Votre session a expiré";
                break;                  
            default:
               msg = code;
        }        
        return msg;
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        return next.handle(request).do((event: HttpEvent<any>) => {
            //Intercept correct response and we check that we have 'success' in the response 
            //  if this is the case then we show the bottomsheet
            if (event instanceof HttpResponse) {
              if(event.body != null && event.body != undefined)
                if (event.body.response == 'success') {
                    this.openBottomSheet(event.body.response,event.status,this.getText(event.body.message));
                }
                // any way to alter response that gets sent to the request subscriber?
            }
        }, (error: any) => {    
            console.log("Interceptor Error !!!!!");
            console.log(error);
            if (error instanceof HttpErrorResponse) {
                if (error.error.exception === 'Tymon\\JWTAuth\\Exceptions\\TokenExpiredException' || 
                   error.error.exception === 'Tymon\\JWTAuth\\Exceptions\\TokenBlacklistedException') {
                    console.log("TOKEN EXPIRED !!!!");
                    this.userService.logout();
                    User.removeToken();
                    this.userService.setCurrent(new User(null));  
                    if (error.error.message != null) 
                        this.openBottomSheet("error",error.status,this.getText(error.error.message));
                    else
                        this.openBottomSheet("error",error.status,"Votre session n'est pas pas valide ou votre acces n'est pas autorize");                     
                    this.router.navigate(['/login']);  
                }
                if (error.status === 401 || error.status === 403) {
                    console.log("TOKEN EXPIRED !!!!");
                    this.userService.logout();
                    User.removeToken();
                    this.userService.setCurrent(new User(null));  
                    if (error.error.message != null) 
                        this.openBottomSheet("error",error.status,this.getText(error.error.message));
                    else
                        this.openBottomSheet("error",error.status,"Votre session n'est pas pas valide ou votre acces n'est pas autorize");                     
                    this.router.navigate(['/login']);  
                    } else {
                        this.openBottomSheet(error.error.response, error.status, this.getText(error.error.message) || error.statusText);
                }
            }
        });


/*

        return next.handle(request).pipe(catchError(err => {
            console.log("We are in interceptor");
            console.log(err);
            //Handle token expired
            if (err.error.exception === 'Tymon\\JWTAuth\\Exceptions\\TokenExpiredException' || 
                err.error.exception === 'Tymon\\JWTAuth\\Exceptions\\TokenBlacklistedException') {
                console.log("TOKEN EXPIRED !!!!");
                this.userService.logout();
                User.removeToken();
                this.userService.setCurrent(new User(null));
                this.router.navigate(['/login']);
            } 

            //Here we transform all error messages to user readable messages
            let formattedMessage : string = ""
            switch (err.error.message) {
                case "validation_failed":
                    formattedMessage = "Parametres du formulaire incorrectes"
                    break;
                case "invalid_email_or_password":
                    formattedMessage = "Mot de passe ou email incorrect";
                    break;
                case "failed_to_create_token": 
                    formattedMessage = "Impossible de creer un token"
                    break;
                case "user_already_registered":
                    formattedMessage = "Email ou mobile déjà enregistres";
                    break;
                case "too_many_logins":
                    formattedMessage = "Trop d'essais, vous devez attendre une minute";   
                    break;
                case "email_not_found":
                    formattedMessage = "Adresse email non enregistré";
                    break;
                case "profile_not_found":
                    formattedMessage = "Compte utilizateur non trouvé";
                    break;
                case "account_exists": 
                    formattedMessage = "Un compte existe deja, la recuperation du compte est impossible";
                    break;
                case "email_not_validated":
                    formattedMessage = "Vous devez valider votre compte email avant de pouvoir acceder";
                    break;    
                default:
                    formattedMessage = err.error.message; 
            }
            //this.openSnackBar(formattedMessage || err.statusText,'OK');
            this.openBottomSheet(err.error.response,formattedMessage || err.statusText);
            console.log("Formatted Message : " + formattedMessage );
            const error = formattedMessage || err.statusText;
            return throwError(error);
            
        }))*/
    }
}