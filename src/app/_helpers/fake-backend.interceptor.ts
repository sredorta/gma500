import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let userTestStatus: { id: number, firstName: string,lastName:string,email:string,mobile:string,password:string,isValidated:boolean }[] = [
            { id: 1, firstName: 'Sergi', lastName: 'Redorta', email:'sergi.redorta@hotmail.com', password: 'Secure0', mobile: '0623133212', isValidated: true},
            { id: 1, firstName: 'Ser', lastName: 'Red', email:'ser@red.com', password: 'Secure0', mobile: '0611223344', isValidated: false}
        ];        
        let testUser = { id: 1, firstName: 'Sergi', lastName: 'Redorta', email:'sergi.redorta@hotmail.com', password: 'Secure0', mobile: '0623133212'};

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // Password reset
            if (request.url.endsWith('/users/resetpassword') && request.method === 'POST') {
                console.log("We are in fake backend !");
                let user = userTestStatus.find(i => i.email === request.body.email);
                if (user != null) {
                    return of(new HttpResponse({ status: 200 }));
                } else {
                    return throwError({ error: { message: 'Email non enregistré' } });
                }    
            } 
 
            // Login
            if (request.url.endsWith('/users/login') && request.method === 'POST') {
                console.log("We are in fake backend !");
                let user = userTestStatus.find(i => i.email === request.body.email && i.password === request.body.password);
                console.log(user);

                if (user != null) {
                    if (!user.isValidated) {
                        return throwError({ error: { message: 'Vous devez valider votre email' } });
                    }
                    return of(new HttpResponse({ status: 200 }));
                } else {
                    return throwError({ error: { message: 'Email ou mot de passe incorrecte' } });
                }    
            } 
            
            // Signup
            if (request.url.endsWith('/users/create') && request.method === 'POST') {
                console.log("We are in fake backend !");
                let user = userTestStatus.find(i => i.email === request.body.email);
                console.log(user);

                if (user != null) {
                    return throwError({ error: { message: 'Compte déjà existent' } });
                } else {
                    return of(new HttpResponse({ status: 200 }));
                }
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