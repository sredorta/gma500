import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import {User} from '../_models/user';


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    userTestStatus : User[] = [
        new User({ id: 1, firstName: 'Sergi', lastName: 'Redorta', email:'sergi.redorta@hotmail.com', password: 'Secure0', mobile: '0623133212', isLoggedIn:false, isValidated: true, roles: ['secretaire','bureau','member'], groups:["member","admin"], avatar:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABgklEQVQoUxXK3UtTYRzA8e/PnalnzddxKoe9YIFTcbXIoPRagq6EMGKQSFB43bV/gf+DFHSjUUFBF6VFBb1AZCUFzczM8FQ729laj9tOO88jfa4/4uaeGktCRKAWWqx9XqM9btibPERLq01rrB2jQVR+1dSLP9h2C8zP32Fl5SNBI+B4up/LM1McPtpHxGpGyu6qUaU8Tx4+5v69ZRq1gFBrtDGcHj3BxelJOhMOkt94Yf6WiizcvM27569IJffTYlls+n+wO2JcuDrFYHrof3xpgjDg1o1FeqNCZqCfb7kc5XqIV1WMTU7Q0+Mg6+8fmCZAK0W8Umfnl4dfKJHo3YcndQ6eTGO3tSHe1mujQ0254PPh0RI/v3ynWKkizUKi7wDnsufpdhykuPXWqB3F1/VN3iwt44hgjPDsU47USIZLV7LsiceR2WszRqkqXsEnqv9x6kgS1/2NX2vgE2VoOMX4+BgycmzYRKwIaIjZNtmzo5zJDDB3/S7bfoUmEbq7OtgFbrOnl/fhFocAAAAASUVORK5CYII=)'}),
        new User({ id: 2, firstName: 'Ser', lastName: 'Red', email:'ser@red.com', password: 'Secure0', mobile: '0611223344', isLoggedIn:false, isValidated: true, roles:['member'], groups:["member"], avatar:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABS0lEQVQoUx2Qu2obURRF1zlzRxpJiQgRCJyAbJGkDQQ37gzp1AelyR/kUadxZbC/IEV+wX9gtyFFKuNGhZsQgYUUDxkNRiNZM/ceMyl2sWGxYG/59enYVBSngqkSgkEw7s1IVVhKoNiWyPLLV0MUBYiEYIaGgJWe1Cs3phQhIP7ogxErRDUqSG0kYFsoVg3ywlF6kOrbyCQGEsHaikVC8WfNxfmSnV6L/ddPcJEil+/fWUehEcHTlscpfP55RZS0yO9y3g4GvOr2keuPh5aGiuZjIWpBvjJOz6a8GPb5PV+w8U2anUfI9/HYRDzFdk0ZSjKr+DGZMux3yaoNSTfGJYqcHIysXhrMU1ngbztmcndLIxbipMF0tqC498ibwUsLAr5O/ZBz7O0+o27TmzmzRYqLHbL7fGAaCYgASpZl7PR7+OBJ/+WUVfUffADEX5NLxCU8vgAAAABJRU5ErkJggg==)'}),
        new User({ id: 3, firstName: 'Pierre', lastName: 'Durin', email:'pierre@durin.com', password: 'Secure0', mobile: '0611223344', isLoggedIn:false, isValidated: true, roles:['bureau','president','member'], groups:["member","admin","kk"], avatar:'url(./assets/img/user-default.jpg)'}),
        new User({ id: 4, firstName: 'Christine', lastName: 'besson', email:'christine.besson@hotmail.com', password: 'Secure0', mobile: '0623133212', isLoggedIn:false, isValidated: true, roles: ['bureau','member'], groups:["member","admin"], avatar:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABgklEQVQoUxXK3UtTYRzA8e/PnalnzddxKoe9YIFTcbXIoPRagq6EMGKQSFB43bV/gf+DFHSjUUFBF6VFBb1AZCUFzczM8FQ729laj9tOO88jfa4/4uaeGktCRKAWWqx9XqM9btibPERLq01rrB2jQVR+1dSLP9h2C8zP32Fl5SNBI+B4up/LM1McPtpHxGpGyu6qUaU8Tx4+5v69ZRq1gFBrtDGcHj3BxelJOhMOkt94Yf6WiizcvM27569IJffTYlls+n+wO2JcuDrFYHrof3xpgjDg1o1FeqNCZqCfb7kc5XqIV1WMTU7Q0+Mg6+8fmCZAK0W8Umfnl4dfKJHo3YcndQ6eTGO3tSHe1mujQ0254PPh0RI/v3ynWKkizUKi7wDnsufpdhykuPXWqB3F1/VN3iwt44hgjPDsU47USIZLV7LsiceR2WszRqkqXsEnqv9x6kgS1/2NX2vgE2VoOMX4+BgycmzYRKwIaIjZNtmzo5zJDDB3/S7bfoUmEbq7OtgFbrOnl/fhFocAAAAASUVORK5CYII=)'}),
        new User({ id: 5, firstName: 'Ben', lastName: 'Vignot', email:'ben.vignot@hotmail.com', password: 'Secure0', mobile: '0611223344', isLoggedIn:false, isValidated: true, roles:['bureau',"member"], groups:["member"], avatar:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABS0lEQVQoUx2Qu2obURRF1zlzRxpJiQgRCJyAbJGkDQQ37gzp1AelyR/kUadxZbC/IEV+wX9gtyFFKuNGhZsQgYUUDxkNRiNZM/ceMyl2sWGxYG/59enYVBSngqkSgkEw7s1IVVhKoNiWyPLLV0MUBYiEYIaGgJWe1Cs3phQhIP7ogxErRDUqSG0kYFsoVg3ywlF6kOrbyCQGEsHaikVC8WfNxfmSnV6L/ddPcJEil+/fWUehEcHTlscpfP55RZS0yO9y3g4GvOr2keuPh5aGiuZjIWpBvjJOz6a8GPb5PV+w8U2anUfI9/HYRDzFdk0ZSjKr+DGZMux3yaoNSTfGJYqcHIysXhrMU1ngbztmcndLIxbipMF0tqC498ibwUsLAr5O/ZBz7O0+o27TmzmzRYqLHbL7fGAaCYgASpZl7PR7+OBJ/+WUVfUffADEX5NLxCU8vgAAAABJRU5ErkJggg==)'}),
        new User({ id: 6, firstName: 'Sophie', lastName: 'Larribeau', email:'sophie@hotmail.com', password: 'Secure0', mobile: '0611223344', isLoggedIn:false, isValidated: true, roles:['bureau',"member"], groups:["member","admin","kk"], avatar:'url(./assets/img/user-default.jpg)'}),
        new User({ id: 7, firstName: 'Anne', lastName: 'Forestier', email:'annef@hotmail.com', password: 'Secure0', mobile: '0623133212', isLoggedIn:false, isValidated: true, roles: ['vice-président','bureau',"member"], groups:["member","admin"], avatar:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABgklEQVQoUxXK3UtTYRzA8e/PnalnzddxKoe9YIFTcbXIoPRagq6EMGKQSFB43bV/gf+DFHSjUUFBF6VFBb1AZCUFzczM8FQ729laj9tOO88jfa4/4uaeGktCRKAWWqx9XqM9btibPERLq01rrB2jQVR+1dSLP9h2C8zP32Fl5SNBI+B4up/LM1McPtpHxGpGyu6qUaU8Tx4+5v69ZRq1gFBrtDGcHj3BxelJOhMOkt94Yf6WiizcvM27569IJffTYlls+n+wO2JcuDrFYHrof3xpgjDg1o1FeqNCZqCfb7kc5XqIV1WMTU7Q0+Mg6+8fmCZAK0W8Umfnl4dfKJHo3YcndQ6eTGO3tSHe1mujQ0254PPh0RI/v3ynWKkizUKi7wDnsufpdhykuPXWqB3F1/VN3iwt44hgjPDsU47USIZLV7LsiceR2WszRqkqXsEnqv9x6kgS1/2NX2vgE2VoOMX4+BgycmzYRKwIaIjZNtmzo5zJDDB3/S7bfoUmEbq7OtgFbrOnl/fhFocAAAAASUVORK5CYII=)'}),
        new User({ id: 8, firstName: 'Francois', lastName: 'Force', email:'f.force@hotmail.com', password: 'Secure0', mobile: '0611223344', isLoggedIn:false, isValidated: true, roles:['trésorier',"member"], groups:["member"], avatar:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABS0lEQVQoUx2Qu2obURRF1zlzRxpJiQgRCJyAbJGkDQQ37gzp1AelyR/kUadxZbC/IEV+wX9gtyFFKuNGhZsQgYUUDxkNRiNZM/ceMyl2sWGxYG/59enYVBSngqkSgkEw7s1IVVhKoNiWyPLLV0MUBYiEYIaGgJWe1Cs3phQhIP7ogxErRDUqSG0kYFsoVg3ywlF6kOrbyCQGEsHaikVC8WfNxfmSnV6L/ddPcJEil+/fWUehEcHTlscpfP55RZS0yO9y3g4GvOr2keuPh5aGiuZjIWpBvjJOz6a8GPb5PV+w8U2anUfI9/HYRDzFdk0ZSjKr+DGZMux3yaoNSTfGJYqcHIysXhrMU1ngbztmcndLIxbipMF0tqC498ibwUsLAr5O/ZBz7O0+o27TmzmzRYqLHbL7fGAaCYgASpZl7PR7+OBJ/+WUVfUffADEX5NLxCU8vgAAAABJRU5ErkJggg==)'}),
        new User({ id: 9, firstName: 'Ser0', lastName: 'Red0', email:'ser0@red.com', password: 'Secure0', mobile: '0611223344', isLoggedIn:false, isValidated: true, roles:['member'], groups:["member"], avatar:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABS0lEQVQoUx2Qu2obURRF1zlzRxpJiQgRCJyAbJGkDQQ37gzp1AelyR/kUadxZbC/IEV+wX9gtyFFKuNGhZsQgYUUDxkNRiNZM/ceMyl2sWGxYG/59enYVBSngqkSgkEw7s1IVVhKoNiWyPLLV0MUBYiEYIaGgJWe1Cs3phQhIP7ogxErRDUqSG0kYFsoVg3ywlF6kOrbyCQGEsHaikVC8WfNxfmSnV6L/ddPcJEil+/fWUehEcHTlscpfP55RZS0yO9y3g4GvOr2keuPh5aGiuZjIWpBvjJOz6a8GPb5PV+w8U2anUfI9/HYRDzFdk0ZSjKr+DGZMux3yaoNSTfGJYqcHIysXhrMU1ngbztmcndLIxbipMF0tqC498ibwUsLAr5O/ZBz7O0+o27TmzmzRYqLHbL7fGAaCYgASpZl7PR7+OBJ/+WUVfUffADEX5NLxCU8vgAAAABJRU5ErkJggg==)'}),
        new User({ id: 10, firstName: 'Ser1', lastName: 'Red1', email:'ser1@red1.com', password: 'Secure0', mobile: '0611223344', isLoggedIn:false, isValidated: true, roles:['member'], groups:["member"], avatar:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABS0lEQVQoUx2Qu2obURRF1zlzRxpJiQgRCJyAbJGkDQQ37gzp1AelyR/kUadxZbC/IEV+wX9gtyFFKuNGhZsQgYUUDxkNRiNZM/ceMyl2sWGxYG/59enYVBSngqkSgkEw7s1IVVhKoNiWyPLLV0MUBYiEYIaGgJWe1Cs3phQhIP7ogxErRDUqSG0kYFsoVg3ywlF6kOrbyCQGEsHaikVC8WfNxfmSnV6L/ddPcJEil+/fWUehEcHTlscpfP55RZS0yO9y3g4GvOr2keuPh5aGiuZjIWpBvjJOz6a8GPb5PV+w8U2anUfI9/HYRDzFdk0ZSjKr+DGZMux3yaoNSTfGJYqcHIysXhrMU1ngbztmcndLIxbipMF0tqC498ibwUsLAr5O/ZBz7O0+o27TmzmzRYqLHbL7fGAaCYgASpZl7PR7+OBJ/+WUVfUffADEX5NLxCU8vgAAAABJRU5ErkJggg==)'}),
        new User({ id: 11, firstName: 'Ser2', lastName: 'Red2', email:'ser2@red2.com', password: 'Secure0', mobile: '0611223344', isLoggedIn:false, isValidated: true, roles:['member'], groups:["member"], avatar:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABS0lEQVQoUx2Qu2obURRF1zlzRxpJiQgRCJyAbJGkDQQ37gzp1AelyR/kUadxZbC/IEV+wX9gtyFFKuNGhZsQgYUUDxkNRiNZM/ceMyl2sWGxYG/59enYVBSngqkSgkEw7s1IVVhKoNiWyPLLV0MUBYiEYIaGgJWe1Cs3phQhIP7ogxErRDUqSG0kYFsoVg3ywlF6kOrbyCQGEsHaikVC8WfNxfmSnV6L/ddPcJEil+/fWUehEcHTlscpfP55RZS0yO9y3g4GvOr2keuPh5aGiuZjIWpBvjJOz6a8GPb5PV+w8U2anUfI9/HYRDzFdk0ZSjKr+DGZMux3yaoNSTfGJYqcHIysXhrMU1ngbztmcndLIxbipMF0tqC498ibwUsLAr5O/ZBz7O0+o27TmzmzRYqLHbL7fGAaCYgASpZl7PR7+OBJ/+WUVfUffADEX5NLxCU8vgAAAABJRU5ErkJggg==)'}),
        new User({ id: 12, firstName: 'Ser3', lastName: 'Red3', email:'ser2@red2.com', password: 'Secure0', mobile: '0611223344', isLoggedIn:false, isValidated: true, roles:['member'], groups:["member"], avatar:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABS0lEQVQoUx2Qu2obURRF1zlzRxpJiQgRCJyAbJGkDQQ37gzp1AelyR/kUadxZbC/IEV+wX9gtyFFKuNGhZsQgYUUDxkNRiNZM/ceMyl2sWGxYG/59enYVBSngqkSgkEw7s1IVVhKoNiWyPLLV0MUBYiEYIaGgJWe1Cs3phQhIP7ogxErRDUqSG0kYFsoVg3ywlF6kOrbyCQGEsHaikVC8WfNxfmSnV6L/ddPcJEil+/fWUehEcHTlscpfP55RZS0yO9y3g4GvOr2keuPh5aGiuZjIWpBvjJOz6a8GPb5PV+w8U2anUfI9/HYRDzFdk0ZSjKr+DGZMux3yaoNSTfGJYqcHIysXhrMU1ngbztmcndLIxbipMF0tqC498ibwUsLAr5O/ZBz7O0+o27TmzmzRYqLHbL7fGAaCYgASpZl7PR7+OBJ/+WUVfUffADEX5NLxCU8vgAAAABJRU5ErkJggg==)'}),
        new User({ id: 13, firstName: 'Ser4', lastName: 'Red4', email:'ser2@red2.com', password: 'Secure0', mobile: '0611223344', isLoggedIn:false, isValidated: true, roles:['member'], groups:["member"], avatar:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABS0lEQVQoUx2Qu2obURRF1zlzRxpJiQgRCJyAbJGkDQQ37gzp1AelyR/kUadxZbC/IEV+wX9gtyFFKuNGhZsQgYUUDxkNRiNZM/ceMyl2sWGxYG/59enYVBSngqkSgkEw7s1IVVhKoNiWyPLLV0MUBYiEYIaGgJWe1Cs3phQhIP7ogxErRDUqSG0kYFsoVg3ywlF6kOrbyCQGEsHaikVC8WfNxfmSnV6L/ddPcJEil+/fWUehEcHTlscpfP55RZS0yO9y3g4GvOr2keuPh5aGiuZjIWpBvjJOz6a8GPb5PV+w8U2anUfI9/HYRDzFdk0ZSjKr+DGZMux3yaoNSTfGJYqcHIysXhrMU1ngbztmcndLIxbipMF0tqC498ibwUsLAr5O/ZBz7O0+o27TmzmzRYqLHbL7fGAaCYgASpZl7PR7+OBJ/+WUVfUffADEX5NLxCU8vgAAAABJRU5ErkJggg==)'}),
        new User({ id: 14, firstName: 'Ser5', lastName: 'Red5', email:'ser2@red2.com', password: 'Secure0', mobile: '0611223344', isLoggedIn:false, isValidated: true, roles:['member'], groups:["member"], avatar:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABS0lEQVQoUx2Qu2obURRF1zlzRxpJiQgRCJyAbJGkDQQ37gzp1AelyR/kUadxZbC/IEV+wX9gtyFFKuNGhZsQgYUUDxkNRiNZM/ceMyl2sWGxYG/59enYVBSngqkSgkEw7s1IVVhKoNiWyPLLV0MUBYiEYIaGgJWe1Cs3phQhIP7ogxErRDUqSG0kYFsoVg3ywlF6kOrbyCQGEsHaikVC8WfNxfmSnV6L/ddPcJEil+/fWUehEcHTlscpfP55RZS0yO9y3g4GvOr2keuPh5aGiuZjIWpBvjJOz6a8GPb5PV+w8U2anUfI9/HYRDzFdk0ZSjKr+DGZMux3yaoNSTfGJYqcHIysXhrMU1ngbztmcndLIxbipMF0tqC498ibwUsLAr5O/ZBz7O0+o27TmzmzRYqLHbL7fGAaCYgASpZl7PR7+OBJ/+WUVfUffADEX5NLxCU8vgAAAABJRU5ErkJggg==)'}),

    ];
    static current: User =  new User({ id: 3, firstName: 'Pierre', lastName: 'Durin', email:'pierre@durin.com', password: 'Secure0', mobile: '0611223344', isLoggedIn:true, isValidated: true, roles:['president','bureau','member'], groups:["member","admin","kk"], avatar:'url(./assets/img/user-default.jpg)'})   


    constructor() { 

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // Password reset
            if (request.url.endsWith('/users/resetpassword') && request.method === 'POST') {
                let user = this.userTestStatus.find(i => i.email === request.body.email);
                if (user != null) {
                    return of(new HttpResponse({ status: 200 }));
                } else {
                    return throwError({ error: { message: 'Email non enregistré' } });
                }    
            } 
 
            // Login
            if (request.url.endsWith('/users/login') && request.method === 'POST') {
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
                let user = this.userTestStatus.find(i => i.email === request.body.email);
                if (user != null) {
                    return throwError({ error: { message: 'Compte déjà existent' } });
                } else {
                    let tmpuser = new User(null);                   
                        tmpuser.id = this.userTestStatus.length + 1;
                        tmpuser.firstName = request.body.firstName;
                        tmpuser.lastName = request.body.lastName;
                        tmpuser.email = request.body.email;
                        tmpuser.mobile = request.body.mobile;
                        tmpuser.password = request.body.password;
                        tmpuser.avatar = "url("+request.body.avatar+")";
                        tmpuser.roles = ["member"];
                        tmpuser.groups= ["member"];
                        tmpuser.isValidated= true;
                        tmpuser.isLoggedIn = true; 
                    this.userTestStatus.push(tmpuser);
                    console.log(this.userTestStatus);
                    return of(new HttpResponse({ status: 200, body:tmpuser }));
                }
            } 

            // Logout
            if (request.url.endsWith('/users/logout') && request.method === 'POST') {
                    return of(new HttpResponse({ status: 200 }));
            } 
 /*           // Members list
            if (request.url.endsWith('/users/getPresident') && request.method === 'POST') {
                console.log("We are in fake backend !");
                let users : User[] = [];
                console.log(this.userTestStatus);
                let allUsers = this.userTestStatus;
                    users.push(allUsers.find(i => i.isPresident()));
                    let result : User[] = [];
                    for (let entry of users) {
                        entry.roles=["Président"];
                        result.push(entry);
                    }
                    return of(new HttpResponse({ status: 200, body: result }));  //Return the user data
   
            } 
            if (request.url.endsWith('/users/getMember') && request.method === 'POST') {
                console.log("We are in fake backend !");
                let users : User[] = [];
                let allUsers = this.userTestStatus;
                    users =allUsers.filter(i => i.isMember()===true);
                    //users.forEach(user=> user.roles = ["Membre"]);
                    return of(new HttpResponse({ status: 200, body: users }));  //Return the user data
   
            } 
            if (request.url.endsWith('/users/getBureau') && request.method === 'POST') {
                console.log("We are in fake backend !");
                let users : User[] = [];
                let allUsers = new Array<User>();

                allUsers= this.userTestStatus;
                    users =allUsers.filter(i => i.isBureau() === true);
                    //users.push(this.userTestStatus.filter(i => i.isBureau()===true);
                    //users.forEach(user=> user.roles = ["Bureau"]);
                    console.log("BUREAU:");
                    console.log(users);
                    return of(new HttpResponse({ status: 200, body: users }));  //Return the user data  
            } 
*/


            // Members list
            if (request.url.endsWith('/users/list') && request.method === 'POST') {
                //We create a copy of userTestStatus to avoid override later calls
                let allUsers = new Array<User>();
                for (let entry of this.userTestStatus) {
                    let tmp = new User(null);
                    tmp.firstName = entry.firstName;
                    tmp.lastName = entry.lastName;
                    tmp.avatar = entry.avatar;
                    tmp.roles = entry.roles;
                    tmp.email = entry.email;
                    tmp.mobile = entry.mobile;
                    allUsers.push(tmp);
                }

                let users : User[] = [];
                if (request.body.role === "president") {
                    users.push(allUsers.find(i => i.isPresident()));
                    //users.map((user)=> user.roles = ["president"]);
                    return of(new HttpResponse({ status: 200, body: users }));  //Return the user data
                }
                if (request.body.role === "board") {
                    //Still issue here as it seems that when we are in board we are then not member...
                    let users2 : User[] = [];
                    let allUsers2 = new Array<User>();
                    for (let entry2 of this.userTestStatus) {
                        let tmp2 = new User(null);
                        tmp2.firstName = entry2.firstName;
                        tmp2.lastName = entry2.lastName;
                        tmp2.avatar = entry2.avatar;
                        tmp2.roles = entry2.roles;
                        tmp2.email = entry2.email;
                        tmp2.mobile = entry2.mobile;
                        allUsers2.push(tmp2);
                    }                    
                    users2 = allUsers2.filter(i => i.isBoard() === true);

                    //Remove all roles non related
                    /*for (let entry3 of users2) {
                        let roles = new Array();   
                        for (let tt of entry3.roles) {
                            roles.push(tt);
                        }                     
                        let index;
                        index = roles.findIndex(x=> x==="president");
                        if (index > -1) roles.splice(index);
                        index = roles.findIndex(x=> x==="member");
                        if (index > -1) roles.splice(index);
                        index = roles.findIndex(x=> x==="bureau");
                        if (index > -1) roles.splice(index);
                        entry3.roles = roles;
                    }*/
                    console.log("board !");
                    console.log(users2);
                    return of(new HttpResponse({ status: 200, body: users2 }));  //Return the user data
                }
                if (request.body.role === "bureau") {
                    users = allUsers.filter(i => i.isBureau() === true);
                    //users.map((user)=> user.roles = ["bureau"]);
                    return of(new HttpResponse({ status: 200, body: users }));  //Return the user data
                }                
                if (request.body.role === "member") {
                    users = allUsers.filter(i => i.isMember() === true);
                    //users.map((user)=> user.roles = ["membre"]);                   
                    return of(new HttpResponse({ status: 200, body: users }));  //Return the user data
                }  
                return throwError({ error: { message: 'Role innexistant !' } });
   
            } 



            return throwError({ error: { message: 'Erreur not connue' } });
            


            // pass through any requests not handled above
            return next.handle(request);
            
        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(1000))
        .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};