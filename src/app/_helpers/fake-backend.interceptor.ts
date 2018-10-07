import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import {User} from '../_models/user';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    userTestStatus: { id: number, firstName: string,lastName:string,email:string,mobile:string,password:string,isValidated:boolean ,role:string, groups:string[], avatar:string}[] = [
        { id: 1, firstName: 'Sergi', lastName: 'Redorta', email:'sergi.redorta@hotmail.com', password: 'Secure0', mobile: '0623133212', isValidated: true, role: 'member', groups:["member","admin"], avatar:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABgklEQVQoUxXK3UtTYRzA8e/PnalnzddxKoe9YIFTcbXIoPRagq6EMGKQSFB43bV/gf+DFHSjUUFBF6VFBb1AZCUFzczM8FQ729laj9tOO88jfa4/4uaeGktCRKAWWqx9XqM9btibPERLq01rrB2jQVR+1dSLP9h2C8zP32Fl5SNBI+B4up/LM1McPtpHxGpGyu6qUaU8Tx4+5v69ZRq1gFBrtDGcHj3BxelJOhMOkt94Yf6WiizcvM27569IJffTYlls+n+wO2JcuDrFYHrof3xpgjDg1o1FeqNCZqCfb7kc5XqIV1WMTU7Q0+Mg6+8fmCZAK0W8Umfnl4dfKJHo3YcndQ6eTGO3tSHe1mujQ0254PPh0RI/v3ynWKkizUKi7wDnsufpdhykuPXWqB3F1/VN3iwt44hgjPDsU47USIZLV7LsiceR2WszRqkqXsEnqv9x6kgS1/2NX2vgE2VoOMX4+BgycmzYRKwIaIjZNtmzo5zJDDB3/S7bfoUmEbq7OtgFbrOnl/fhFocAAAAASUVORK5CYII=)'},
        { id: 2, firstName: 'Ser', lastName: 'Red', email:'ser@red.com', password: 'Secure0', mobile: '0611223344', isValidated: true, role:'member', groups:["member"], avatar:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABS0lEQVQoUx2Qu2obURRF1zlzRxpJiQgRCJyAbJGkDQQ37gzp1AelyR/kUadxZbC/IEV+wX9gtyFFKuNGhZsQgYUUDxkNRiNZM/ceMyl2sWGxYG/59enYVBSngqkSgkEw7s1IVVhKoNiWyPLLV0MUBYiEYIaGgJWe1Cs3phQhIP7ogxErRDUqSG0kYFsoVg3ywlF6kOrbyCQGEsHaikVC8WfNxfmSnV6L/ddPcJEil+/fWUehEcHTlscpfP55RZS0yO9y3g4GvOr2keuPh5aGiuZjIWpBvjJOz6a8GPb5PV+w8U2anUfI9/HYRDzFdk0ZSjKr+DGZMux3yaoNSTfGJYqcHIysXhrMU1ngbztmcndLIxbipMF0tqC498ibwUsLAr5O/ZBz7O0+o27TmzmzRYqLHbL7fGAaCYgASpZl7PR7+OBJ/+WUVfUffADEX5NLxCU8vgAAAABJRU5ErkJggg==)'},
        { id: 3, firstName: 'Pierre', lastName: 'Durin', email:'pierre@durin.com', password: 'Secure0', mobile: '0611223344', isValidated: true, role:'president', groups:["member","admin","kk"], avatar:'url(./assets/img/user-default.jpg)'}
    ];
    static current: { id: 3, firstName: 'Pierre', lastName: 'Durin', email:'pierre@durin.com', password: 'Secure0', mobile: '0611223344', isValidated: true, role:'president', isLoggedIn:true, groups:["member","admin","kk"], avatar:'url(./assets/img/user-default.jpg)'};      

    constructor() { 

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // Password reset
            if (request.url.endsWith('/users/resetpassword') && request.method === 'POST') {
                console.log("We are in fake backend !");
                let user = this.userTestStatus.find(i => i.email === request.body.email);
                if (user != null) {
                    return of(new HttpResponse({ status: 200 }));
                } else {
                    return throwError({ error: { message: 'Email non enregistré' } });
                }    
            } 
 
            // Login
            if (request.url.endsWith('/users/login') && request.method === 'POST') {
                console.log("We are in fake backend !");
                console.log(this.userTestStatus);
                let user = this.userTestStatus.find(i => i.email === request.body.email && i.password === request.body.password);
                console.log(user);

                if (user != null) {
                    if (!user.isValidated) {
                        return throwError({ error: { message: 'Vous devez valider votre email' } });
                    }
                    return of(new HttpResponse({ status: 200, body: user }));  //Return the user data
                } else {
                    return throwError({ error: { message: 'Email ou mot de passe incorrecte' } });
                }    
            } 
            
            // Signup
            if (request.url.endsWith('/users/create') && request.method === 'POST') {
                console.log("We are in fake backend !");
                let user = this.userTestStatus.find(i => i.email === request.body.email);
                if (user != null) {
                    return throwError({ error: { message: 'Compte déjà existent' } });
                } else {
                    let user = {
                        id : this.userTestStatus.length + 1,
                        firstName : request.body.firstName,
                        lastName : request.body.lastName,
                        email : request.body.email,
                        mobile : request.body.mobile,
                        password : request.body.password,
                        avatar : "url("+request.body.avatar+")",
                        role : "member",
                        groups: ["member"],
                        isValidated: true,
                        isLoggedIn : true 
                    }
                    this.userTestStatus.push(user);
                    console.log(this.userTestStatus);
                    return of(new HttpResponse({ status: 200, body:user }));
                }
            } 
            // Logout
            if (request.url.endsWith('/users/logout') && request.method === 'POST') {
                    return of(new HttpResponse({ status: 200 }));
            } 

            return throwError({ error: { message: 'Erreur not connue' } });
            


            // pass through any requests not handled above
            return next.handle(request);
            
        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};