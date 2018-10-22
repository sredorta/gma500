import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {User} from './../_models/user';
import { UserService } from '../_services/user.service';

//We intercept all http requests and parse error and return correct error message

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private userService: UserService, private router : Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.log("We are in interceptor");
            console.log(err);
            //Handle token expired
            if (err.error.exception === 'Tymon\\JWTAuth\\Exceptions\\TokenExpiredException') {
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
                default:
                    formattedMessage = err.error.message; 
            }
            console.log("Formatted Message : " + formattedMessage );
            const error = formattedMessage || err.statusText;
            return throwError(error);
            
        }))
    }
}