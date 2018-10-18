/*import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {User} from '../_models/user';
import {Product} from '../_models/product';

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

    productTestList : Product[] = [
        new Product({id:1,cathegory:"Sécurité",type:"ARVA",brand:"ortovox",description:"ARVA pour quand on est dans la merde",isAvailable:true,usage:"interieur",serialNumber:"AASSSXXBB",idGMA:"1",fabricatedOn:"10/02/2016",boughtOn:"10/03/2017",controls:[{year:"2016",comment:"A reenvoyer en 2018"},{year:"2018",comment:"A reenvoyer en 2019"}],docLink:"Link to doc",image:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABS0lEQVQoUx2Qu2obURRF1zlzRxpJiQgRCJyAbJGkDQQ37gzp1AelyR/kUadxZbC/IEV+wX9gtyFFKuNGhZsQgYUUDxkNRiNZM/ceMyl2sWGxYG/59enYVBSngqkSgkEw7s1IVVhKoNiWyPLLV0MUBYiEYIaGgJWe1Cs3phQhIP7ogxErRDUqSG0kYFsoVg3ywlF6kOrbyCQGEsHaikVC8WfNxfmSnV6L/ddPcJEil+/fWUehEcHTlscpfP55RZS0yO9y3g4GvOr2keuPh5aGiuZjIWpBvjJOz6a8GPb5PV+w8U2anUfI9/HYRDzFdk0ZSjKr+DGZMux3yaoNSTfGJYqcHIysXhrMU1ngbztmcndLIxbipMF0tqC498ibwUsLAr5O/ZBz7O0+o27TmzmzRYqLHbL7fGAaCYgASpZl7PR7+OBJ/+WUVfUffADEX5NLxCU8vgAAAABJRU5ErkJggg==)'}),
        new Product({id:2,cathegory:"Sécurité",type:"ARVA",brand:"ortovox",description:"ARVA pour quand on est dans la merde",isAvailable:true,usage:"exterieur",serialNumber:"AARRMMMGG",idGMA:"2",fabricatedOn:"11/02/2014",boughtOn:"11/03/2016",controls:[{year:"2016",comment:"A reenvoyer en 2018"},{year:"2018",comment:"A reenvoyer en 2019"}],docLink:"Link to doc",image:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABS0lEQVQoUx2Qu2obURRF1zlzRxpJiQgRCJyAbJGkDQQ37gzp1AelyR/kUadxZbC/IEV+wX9gtyFFKuNGhZsQgYUUDxkNRiNZM/ceMyl2sWGxYG/59enYVBSngqkSgkEw7s1IVVhKoNiWyPLLV0MUBYiEYIaGgJWe1Cs3phQhIP7ogxErRDUqSG0kYFsoVg3ywlF6kOrbyCQGEsHaikVC8WfNxfmSnV6L/ddPcJEil+/fWUehEcHTlscpfP55RZS0yO9y3g4GvOr2keuPh5aGiuZjIWpBvjJOz6a8GPb5PV+w8U2anUfI9/HYRDzFdk0ZSjKr+DGZMux3yaoNSTfGJYqcHIysXhrMU1ngbztmcndLIxbipMF0tqC498ibwUsLAr5O/ZBz7O0+o27TmzmzRYqLHbL7fGAaCYgASpZl7PR7+OBJ/+WUVfUffADEX5NLxCU8vgAAAABJRU5ErkJggg==)'}),
        new Product({id:3,cathegory:"Sécurité",type:"BATONS",brand:"grivel",description:"Batons de marche homme",isAvailable:false,usage:"exterieur",serialNumber:"CCDDEEFF",idGMA:"A13",fabricatedOn:"20/09/2016",boughtOn:"20/09/2017",controls:[null],docLink:"Link to doc",image:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABgklEQVQoUxXK3UtTYRzA8e/PnalnzddxKoe9YIFTcbXIoPRagq6EMGKQSFB43bV/gf+DFHSjUUFBF6VFBb1AZCUFzczM8FQ729laj9tOO88jfa4/4uaeGktCRKAWWqx9XqM9btibPERLq01rrB2jQVR+1dSLP9h2C8zP32Fl5SNBI+B4up/LM1McPtpHxGpGyu6qUaU8Tx4+5v69ZRq1gFBrtDGcHj3BxelJOhMOkt94Yf6WiizcvM27569IJffTYlls+n+wO2JcuDrFYHrof3xpgjDg1o1FeqNCZqCfb7kc5XqIV1WMTU7Q0+Mg6+8fmCZAK0W8Umfnl4dfKJHo3YcndQ6eTGO3tSHe1mujQ0254PPh0RI/v3ynWKkizUKi7wDnsufpdhykuPXWqB3F1/VN3iwt44hgjPDsU47USIZLV7LsiceR2WszRqkqXsEnqv9x6kgS1/2NX2vgE2VoOMX4+BgycmzYRKwIaIjZNtmzo5zJDDB3/S7bfoUmEbq7OtgFbrOnl/fhFocAAAAASUVORK5CYII=)'}),
        new Product({id:4,cathegory:"Sécurité",type:"PELLE",brand:"ortovox",description:"Pelle 01",isAvailable:true,usage:"exterieur",serialNumber:"BBGGHHDDD",idGMA:"PE01",fabricatedOn:"12/02/2010",boughtOn:"12/03/2012",controls:[{year:"2015",comment:"Legerement fissurer a reviser en 2018"}],docLink:"Link to doc",image:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABS0lEQVQoUx2Qu2obURRF1zlzRxpJiQgRCJyAbJGkDQQ37gzp1AelyR/kUadxZbC/IEV+wX9gtyFFKuNGhZsQgYUUDxkNRiNZM/ceMyl2sWGxYG/59enYVBSngqkSgkEw7s1IVVhKoNiWyPLLV0MUBYiEYIaGgJWe1Cs3phQhIP7ogxErRDUqSG0kYFsoVg3ywlF6kOrbyCQGEsHaikVC8WfNxfmSnV6L/ddPcJEil+/fWUehEcHTlscpfP55RZS0yO9y3g4GvOr2keuPh5aGiuZjIWpBvjJOz6a8GPb5PV+w8U2anUfI9/HYRDzFdk0ZSjKr+DGZMux3yaoNSTfGJYqcHIysXhrMU1ngbztmcndLIxbipMF0tqC498ibwUsLAr5O/ZBz7O0+o27TmzmzRYqLHbL7fGAaCYgASpZl7PR7+OBJ/+WUVfUffADEX5NLxCU8vgAAAABJRU5ErkJggg==)'}),
        new Product({id:6,cathegory:"Sécurité",type:"ARVA",brand:"ortovox",description:"ARVA pour quand on est dans la merde",isAvailable:true,usage:"interieur",serialNumber:"AASSSXXBB",idGMA:"1",fabricatedOn:"10/02/2016",boughtOn:"10/03/2017",controls:[{year:"2016",comment:"A reenvoyer en 2018"},{year:"2018",comment:"A reenvoyer en 2019"}],docLink:"Link to doc",image:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABS0lEQVQoUx2Qu2obURRF1zlzRxpJiQgRCJyAbJGkDQQ37gzp1AelyR/kUadxZbC/IEV+wX9gtyFFKuNGhZsQgYUUDxkNRiNZM/ceMyl2sWGxYG/59enYVBSngqkSgkEw7s1IVVhKoNiWyPLLV0MUBYiEYIaGgJWe1Cs3phQhIP7ogxErRDUqSG0kYFsoVg3ywlF6kOrbyCQGEsHaikVC8WfNxfmSnV6L/ddPcJEil+/fWUehEcHTlscpfP55RZS0yO9y3g4GvOr2keuPh5aGiuZjIWpBvjJOz6a8GPb5PV+w8U2anUfI9/HYRDzFdk0ZSjKr+DGZMux3yaoNSTfGJYqcHIysXhrMU1ngbztmcndLIxbipMF0tqC498ibwUsLAr5O/ZBz7O0+o27TmzmzRYqLHbL7fGAaCYgASpZl7PR7+OBJ/+WUVfUffADEX5NLxCU8vgAAAABJRU5ErkJggg==)'}),
        new Product({id:7,cathegory:"Sécurité",type:"ARVA",brand:"ortovox",description:"ARVA pour quand on est dans la merde",isAvailable:true,usage:"exterieur",serialNumber:"AARRMMMGG",idGMA:"2",fabricatedOn:"11/02/2014",boughtOn:"11/03/2016",controls:[{year:"2016",comment:"A reenvoyer en 2018"},{year:"2018",comment:"A reenvoyer en 2019"}],docLink:"Link to doc",image:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABS0lEQVQoUx2Qu2obURRF1zlzRxpJiQgRCJyAbJGkDQQ37gzp1AelyR/kUadxZbC/IEV+wX9gtyFFKuNGhZsQgYUUDxkNRiNZM/ceMyl2sWGxYG/59enYVBSngqkSgkEw7s1IVVhKoNiWyPLLV0MUBYiEYIaGgJWe1Cs3phQhIP7ogxErRDUqSG0kYFsoVg3ywlF6kOrbyCQGEsHaikVC8WfNxfmSnV6L/ddPcJEil+/fWUehEcHTlscpfP55RZS0yO9y3g4GvOr2keuPh5aGiuZjIWpBvjJOz6a8GPb5PV+w8U2anUfI9/HYRDzFdk0ZSjKr+DGZMux3yaoNSTfGJYqcHIysXhrMU1ngbztmcndLIxbipMF0tqC498ibwUsLAr5O/ZBz7O0+o27TmzmzRYqLHbL7fGAaCYgASpZl7PR7+OBJ/+WUVfUffADEX5NLxCU8vgAAAABJRU5ErkJggg==)'}),
        new Product({id:8,cathegory:"Randonee",type:"BATONS",brand:"grivel",description:"Batons de marche homme",isAvailable:false,usage:"exterieur",serialNumber:"CCDDEEFF",idGMA:"A13",fabricatedOn:"20/09/2016",boughtOn:"20/09/2017",controls:[null],docLink:"Link to doc",image:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABgklEQVQoUxXK3UtTYRzA8e/PnalnzddxKoe9YIFTcbXIoPRagq6EMGKQSFB43bV/gf+DFHSjUUFBF6VFBb1AZCUFzczM8FQ729laj9tOO88jfa4/4uaeGktCRKAWWqx9XqM9btibPERLq01rrB2jQVR+1dSLP9h2C8zP32Fl5SNBI+B4up/LM1McPtpHxGpGyu6qUaU8Tx4+5v69ZRq1gFBrtDGcHj3BxelJOhMOkt94Yf6WiizcvM27569IJffTYlls+n+wO2JcuDrFYHrof3xpgjDg1o1FeqNCZqCfb7kc5XqIV1WMTU7Q0+Mg6+8fmCZAK0W8Umfnl4dfKJHo3YcndQ6eTGO3tSHe1mujQ0254PPh0RI/v3ynWKkizUKi7wDnsufpdhykuPXWqB3F1/VN3iwt44hgjPDsU47USIZLV7LsiceR2WszRqkqXsEnqv9x6kgS1/2NX2vgE2VoOMX4+BgycmzYRKwIaIjZNtmzo5zJDDB3/S7bfoUmEbq7OtgFbrOnl/fhFocAAAAASUVORK5CYII=)'}),
        new Product({id:9,cathegory:"Sécurité",type:"PELLE",brand:"ortovox",description:"Pelle 01",isAvailable:true,usage:"exterieur",serialNumber:"BBGGHHDDD",idGMA:"PE01",fabricatedOn:"12/02/2010",boughtOn:"12/03/2012",controls:[{year:"2015",comment:"Legerement fissurer a reviser en 2018"}],docLink:"Link to doc",image:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABS0lEQVQoUx2Qu2obURRF1zlzRxpJiQgRCJyAbJGkDQQ37gzp1AelyR/kUadxZbC/IEV+wX9gtyFFKuNGhZsQgYUUDxkNRiNZM/ceMyl2sWGxYG/59enYVBSngqkSgkEw7s1IVVhKoNiWyPLLV0MUBYiEYIaGgJWe1Cs3phQhIP7ogxErRDUqSG0kYFsoVg3ywlF6kOrbyCQGEsHaikVC8WfNxfmSnV6L/ddPcJEil+/fWUehEcHTlscpfP55RZS0yO9y3g4GvOr2keuPh5aGiuZjIWpBvjJOz6a8GPb5PV+w8U2anUfI9/HYRDzFdk0ZSjKr+DGZMux3yaoNSTfGJYqcHIysXhrMU1ngbztmcndLIxbipMF0tqC498ibwUsLAr5O/ZBz7O0+o27TmzmzRYqLHbL7fGAaCYgASpZl7PR7+OBJ/+WUVfUffADEX5NLxCU8vgAAAABJRU5ErkJggg==)'}),
        new Product({id:10,cathegory:"Ski",type:"SKI",brand:"Mouvement",description:"Skis de randonee en 1.70cm, fixations pour du 42 au 44",isAvailable:true,usage:"exterieur",serialNumber:"AARRMMMGG",idGMA:"2",fabricatedOn:"11/02/2014",boughtOn:"11/03/2016",controls:[{year:"2016",comment:"A reenvoyer en 2018"},{year:"2018",comment:"A reenvoyer en 2019"}],docLink:"Link to doc",image:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABS0lEQVQoUx2Qu2obURRF1zlzRxpJiQgRCJyAbJGkDQQ37gzp1AelyR/kUadxZbC/IEV+wX9gtyFFKuNGhZsQgYUUDxkNRiNZM/ceMyl2sWGxYG/59enYVBSngqkSgkEw7s1IVVhKoNiWyPLLV0MUBYiEYIaGgJWe1Cs3phQhIP7ogxErRDUqSG0kYFsoVg3ywlF6kOrbyCQGEsHaikVC8WfNxfmSnV6L/ddPcJEil+/fWUehEcHTlscpfP55RZS0yO9y3g4GvOr2keuPh5aGiuZjIWpBvjJOz6a8GPb5PV+w8U2anUfI9/HYRDzFdk0ZSjKr+DGZMux3yaoNSTfGJYqcHIysXhrMU1ngbztmcndLIxbipMF0tqC498ibwUsLAr5O/ZBz7O0+o27TmzmzRYqLHbL7fGAaCYgASpZl7PR7+OBJ/+WUVfUffADEX5NLxCU8vgAAAABJRU5ErkJggg==)'}),
        new Product({id:11,cathegory:"Ski",type:"BATONS",brand:"grivel",description:"Batons de ski de randonee telescopics",isAvailable:false,usage:"exterieur",serialNumber:"CCDDEEFF",idGMA:"A13",fabricatedOn:"20/09/2016",boughtOn:"20/09/2017",controls:[null],docLink:"Link to doc",image:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABgklEQVQoUxXK3UtTYRzA8e/PnalnzddxKoe9YIFTcbXIoPRagq6EMGKQSFB43bV/gf+DFHSjUUFBF6VFBb1AZCUFzczM8FQ729laj9tOO88jfa4/4uaeGktCRKAWWqx9XqM9btibPERLq01rrB2jQVR+1dSLP9h2C8zP32Fl5SNBI+B4up/LM1McPtpHxGpGyu6qUaU8Tx4+5v69ZRq1gFBrtDGcHj3BxelJOhMOkt94Yf6WiizcvM27569IJffTYlls+n+wO2JcuDrFYHrof3xpgjDg1o1FeqNCZqCfb7kc5XqIV1WMTU7Q0+Mg6+8fmCZAK0W8Umfnl4dfKJHo3YcndQ6eTGO3tSHe1mujQ0254PPh0RI/v3ynWKkizUKi7wDnsufpdhykuPXWqB3F1/VN3iwt44hgjPDsU47USIZLV7LsiceR2WszRqkqXsEnqv9x6kgS1/2NX2vgE2VoOMX4+BgycmzYRKwIaIjZNtmzo5zJDDB3/S7bfoUmEbq7OtgFbrOnl/fhFocAAAAASUVORK5CYII=)'}),
        new Product({id:12,cathegory:"Sécurité",type:"PELLE",brand:"ortovox",description:"Pelle 01",isAvailable:true,usage:"exterieur",serialNumber:"BBGGHHDDD",idGMA:"PE01",fabricatedOn:"12/02/2010",boughtOn:"12/03/2012",controls:[{year:"2015",comment:"Legerement fissurer a reviser en 2018"}],docLink:"Link to doc",image:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABS0lEQVQoUx2Qu2obURRF1zlzRxpJiQgRCJyAbJGkDQQ37gzp1AelyR/kUadxZbC/IEV+wX9gtyFFKuNGhZsQgYUUDxkNRiNZM/ceMyl2sWGxYG/59enYVBSngqkSgkEw7s1IVVhKoNiWyPLLV0MUBYiEYIaGgJWe1Cs3phQhIP7ogxErRDUqSG0kYFsoVg3ywlF6kOrbyCQGEsHaikVC8WfNxfmSnV6L/ddPcJEil+/fWUehEcHTlscpfP55RZS0yO9y3g4GvOr2keuPh5aGiuZjIWpBvjJOz6a8GPb5PV+w8U2anUfI9/HYRDzFdk0ZSjKr+DGZMux3yaoNSTfGJYqcHIysXhrMU1ngbztmcndLIxbipMF0tqC498ibwUsLAr5O/ZBz7O0+o27TmzmzRYqLHbL7fGAaCYgASpZl7PR7+OBJ/+WUVfUffADEX5NLxCU8vgAAAABJRU5ErkJggg==)'}),
        new Product({id:13,cathegory:"Escalade",type:"SKI",brand:"Mouvement",description:"Skis de randonee en 1.70cm, fixations pour du 42 au 44",isAvailable:true,usage:"exterieur",serialNumber:"AARRMMMGG",idGMA:"2",fabricatedOn:"11/02/2014",boughtOn:"11/03/2016",controls:[{year:"2016",comment:"A reenvoyer en 2018"},{year:"2018",comment:"A reenvoyer en 2019"}],docLink:"Link to doc",image:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABS0lEQVQoUx2Qu2obURRF1zlzRxpJiQgRCJyAbJGkDQQ37gzp1AelyR/kUadxZbC/IEV+wX9gtyFFKuNGhZsQgYUUDxkNRiNZM/ceMyl2sWGxYG/59enYVBSngqkSgkEw7s1IVVhKoNiWyPLLV0MUBYiEYIaGgJWe1Cs3phQhIP7ogxErRDUqSG0kYFsoVg3ywlF6kOrbyCQGEsHaikVC8WfNxfmSnV6L/ddPcJEil+/fWUehEcHTlscpfP55RZS0yO9y3g4GvOr2keuPh5aGiuZjIWpBvjJOz6a8GPb5PV+w8U2anUfI9/HYRDzFdk0ZSjKr+DGZMux3yaoNSTfGJYqcHIysXhrMU1ngbztmcndLIxbipMF0tqC498ibwUsLAr5O/ZBz7O0+o27TmzmzRYqLHbL7fGAaCYgASpZl7PR7+OBJ/+WUVfUffADEX5NLxCU8vgAAAABJRU5ErkJggg==)'}),
        new Product({id:14,cathegory:"Escalade",type:"CHAUSSURES",brand:"Dynafit",description:"Chaussures de ski rando taille 42",isAvailable:false,usage:"exterieur",serialNumber:"CCDDEEFF",idGMA:"A13",fabricatedOn:"20/09/2016",boughtOn:"20/09/2017",controls:[null],docLink:"Link to doc",image:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABgklEQVQoUxXK3UtTYRzA8e/PnalnzddxKoe9YIFTcbXIoPRagq6EMGKQSFB43bV/gf+DFHSjUUFBF6VFBb1AZCUFzczM8FQ729laj9tOO88jfa4/4uaeGktCRKAWWqx9XqM9btibPERLq01rrB2jQVR+1dSLP9h2C8zP32Fl5SNBI+B4up/LM1McPtpHxGpGyu6qUaU8Tx4+5v69ZRq1gFBrtDGcHj3BxelJOhMOkt94Yf6WiizcvM27569IJffTYlls+n+wO2JcuDrFYHrof3xpgjDg1o1FeqNCZqCfb7kc5XqIV1WMTU7Q0+Mg6+8fmCZAK0W8Umfnl4dfKJHo3YcndQ6eTGO3tSHe1mujQ0254PPh0RI/v3ynWKkizUKi7wDnsufpdhykuPXWqB3F1/VN3iwt44hgjPDsU47USIZLV7LsiceR2WszRqkqXsEnqv9x6kgS1/2NX2vgE2VoOMX4+BgycmzYRKwIaIjZNtmzo5zJDDB3/S7bfoUmEbq7OtgFbrOnl/fhFocAAAAASUVORK5CYII=)'}),
        new Product({id:15,cathegory:"Escalade",type:"CORDE",brand:"Mamut",description:"Corde d'escalade en 80m pour utilization simple",isAvailable:true,usage:"exterieur",serialNumber:"BBGGHHDDD",idGMA:"PE01",fabricatedOn:"12/02/2010",boughtOn:"12/03/2012",controls:[{year:"2015",comment:"Legerement fissurer a reviser en 2018"}],docLink:"Link to doc",image:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABS0lEQVQoUx2Qu2obURRF1zlzRxpJiQgRCJyAbJGkDQQ37gzp1AelyR/kUadxZbC/IEV+wX9gtyFFKuNGhZsQgYUUDxkNRiNZM/ceMyl2sWGxYG/59enYVBSngqkSgkEw7s1IVVhKoNiWyPLLV0MUBYiEYIaGgJWe1Cs3phQhIP7ogxErRDUqSG0kYFsoVg3ywlF6kOrbyCQGEsHaikVC8WfNxfmSnV6L/ddPcJEil+/fWUehEcHTlscpfP55RZS0yO9y3g4GvOr2keuPh5aGiuZjIWpBvjJOz6a8GPb5PV+w8U2anUfI9/HYRDzFdk0ZSjKr+DGZMux3yaoNSTfGJYqcHIysXhrMU1ngbztmcndLIxbipMF0tqC498ibwUsLAr5O/ZBz7O0+o27TmzmzRYqLHbL7fGAaCYgASpZl7PR7+OBJ/+WUVfUffADEX5NLxCU8vgAAAABJRU5ErkJggg==)'}),
        new Product({id:16,cathegory:"Escalade",type:"RAPPEL",brand:"Millet",description:"Rappel d'escalade en 8mm et 50m",isAvailable:true,usage:"exterieur",serialNumber:"AARRMMMGG",idGMA:"2",fabricatedOn:"11/02/2014",boughtOn:"11/03/2016",controls:[{year:"2016",comment:"A reenvoyer en 2018"},{year:"2018",comment:"A reenvoyer en 2019"}],docLink:"Link to doc",image:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABS0lEQVQoUx2Qu2obURRF1zlzRxpJiQgRCJyAbJGkDQQ37gzp1AelyR/kUadxZbC/IEV+wX9gtyFFKuNGhZsQgYUUDxkNRiNZM/ceMyl2sWGxYG/59enYVBSngqkSgkEw7s1IVVhKoNiWyPLLV0MUBYiEYIaGgJWe1Cs3phQhIP7ogxErRDUqSG0kYFsoVg3ywlF6kOrbyCQGEsHaikVC8WfNxfmSnV6L/ddPcJEil+/fWUehEcHTlscpfP55RZS0yO9y3g4GvOr2keuPh5aGiuZjIWpBvjJOz6a8GPb5PV+w8U2anUfI9/HYRDzFdk0ZSjKr+DGZMux3yaoNSTfGJYqcHIysXhrMU1ngbztmcndLIxbipMF0tqC498ibwUsLAr5O/ZBz7O0+o27TmzmzRYqLHbL7fGAaCYgASpZl7PR7+OBJ/+WUVfUffADEX5NLxCU8vgAAAABJRU5ErkJggg==)'}),
        new Product({id:17,cathegory:"Canyoning",type:"CORDE",brand:"Beal",description:"Corde de 40m non elastique",isAvailable:false,usage:"exterieur",serialNumber:"CCDDEEFF",idGMA:"A13",fabricatedOn:"20/09/2016",boughtOn:"20/09/2017",controls:[null],docLink:"Link to doc",image:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABgklEQVQoUxXK3UtTYRzA8e/PnalnzddxKoe9YIFTcbXIoPRagq6EMGKQSFB43bV/gf+DFHSjUUFBF6VFBb1AZCUFzczM8FQ729laj9tOO88jfa4/4uaeGktCRKAWWqx9XqM9btibPERLq01rrB2jQVR+1dSLP9h2C8zP32Fl5SNBI+B4up/LM1McPtpHxGpGyu6qUaU8Tx4+5v69ZRq1gFBrtDGcHj3BxelJOhMOkt94Yf6WiizcvM27569IJffTYlls+n+wO2JcuDrFYHrof3xpgjDg1o1FeqNCZqCfb7kc5XqIV1WMTU7Q0+Mg6+8fmCZAK0W8Umfnl4dfKJHo3YcndQ6eTGO3tSHe1mujQ0254PPh0RI/v3ynWKkizUKi7wDnsufpdhykuPXWqB3F1/VN3iwt44hgjPDsU47USIZLV7LsiceR2WszRqkqXsEnqv9x6kgS1/2NX2vgE2VoOMX4+BgycmzYRKwIaIjZNtmzo5zJDDB3/S7bfoUmEbq7OtgFbrOnl/fhFocAAAAASUVORK5CYII=)'}),
        new Product({id:18,cathegory:"Canyoning",type:"CORDE",brand:"Beal",description:"Corde statique de 20m",isAvailable:true,usage:"exterieur",serialNumber:"BBGGHHDDD",idGMA:"PE01",fabricatedOn:"12/02/2010",boughtOn:"12/03/2012",controls:[{year:"2015",comment:"Legerement fissurer a reviser en 2018"}],docLink:"Link to doc",image:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAABS0lEQVQoUx2Qu2obURRF1zlzRxpJiQgRCJyAbJGkDQQ37gzp1AelyR/kUadxZbC/IEV+wX9gtyFFKuNGhZsQgYUUDxkNRiNZM/ceMyl2sWGxYG/59enYVBSngqkSgkEw7s1IVVhKoNiWyPLLV0MUBYiEYIaGgJWe1Cs3phQhIP7ogxErRDUqSG0kYFsoVg3ywlF6kOrbyCQGEsHaikVC8WfNxfmSnV6L/ddPcJEil+/fWUehEcHTlscpfP55RZS0yO9y3g4GvOr2keuPh5aGiuZjIWpBvjJOz6a8GPb5PV+w8U2anUfI9/HYRDzFdk0ZSjKr+DGZMux3yaoNSTfGJYqcHIysXhrMU1ngbztmcndLIxbipMF0tqC498ibwUsLAr5O/ZBz7O0+o27TmzmzRYqLHbL7fGAaCYgASpZl7PR7+OBJ/+WUVfUffADEX5NLxCU8vgAAAABJRU5ErkJggg==)'}),

    ];

    productCathegories : string[] = ['Sécurité','Ski','Randonee','Escalade','Canyoning','VTT'];
    productTypes : string[] = ['Batons','Arva','Corde','Crampons']; 


    //static current: User =  new User({ id: 3, firstName: 'Pierre', lastName: 'Durin', email:'pierre@durin.com', password: 'Secure0', mobile: '0611223344', isLoggedIn:true, isValidated: true, roles:['president','bureau','member'], groups:["member","admin","kk"], avatar:'url(./assets/img/user-default.jpg)'})   
    static current: User = new User(null);

    constructor() { 

    }
   
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
/////////////////////////////////// CONFIG PART //////////////////////////////////////////////////////////////////
            // Product cathegories
            if (request.url.endsWith('/config/products/cathegories') && request.method === 'GET') {
                    return of(new HttpResponse({ status: 200,body:this.productCathegories }));
            } 

            if (request.url.endsWith('/config/products/types') && request.method === 'GET') {
                return of(new HttpResponse({ status: 200,body:this.productTypes }));
            } 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
                        //tmpuser.avatar = "url("+request.body.avatar+")";
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
           // Product list
           if (request.url.endsWith('/products/indexes') && request.method === 'POST') {
               console.log("In fake !");
               console.log(request.body.cathegory);
               console.log(request.body.type);
            //We create a copy of userTestStatus to avoid override later calls
            let allProducts = new Array<number>();
            for (let entry of this.productTestList) {
                if (request.body.cathegory !== 'all') {
                    if (entry.cathegory === request.body.cathegory) {
                        allProducts.push(entry.id);
                    }
                } else {
                    allProducts.push(entry.id);
                }
            }
            console.log("Returning :");
            console.log(allProducts);
            if (request.body.id == undefined) {
                return of(new HttpResponse({ status: 200, body: allProducts }));  //Return the user data
            } else {
                return of(new HttpResponse({ status: 200, body: allProducts }));  //Return the user data
            }
           } 

            // Product list
            if (request.url.endsWith('/products/list') && request.method === 'POST') {
                //We create a copy of userTestStatus to avoid override later calls
                let allProducts = new Array<Product>();
                for (let entry of this.productTestList) {
                    let tmp = new Product(null);
                    tmp.id = entry.id;
                    tmp.image = entry.image;
                    tmp.type = entry.type;
                    tmp.brand = entry.brand;
                    tmp.description = entry.description;
                    tmp.usage = entry.usage;
                    tmp.serialNumber = entry.serialNumber;
                    tmp.idGMA = entry.idGMA;
                    tmp.fabricatedOn = entry.fabricatedOn;
                    tmp.expiresOn = entry.expiresOn;
                    tmp.controls = entry.controls;
                    tmp.docLink = entry.docLink;
                    tmp.comments = entry.comments;
                    tmp.isAvailable= entry.isAvailable;
                    allProducts.push(tmp);
                }
                if (request.body.id == undefined) {
                    let products : Product[] = [];
                    allProducts.forEach(el=> products.push(el));
                    return of(new HttpResponse({ status: 200, body: products }));  //Return the user data
                } else {
                    let tmp = new Product(null);
                    tmp = allProducts.find(i => i.id === request.body.id);
                    console.log(tmp);
                    return of(new HttpResponse({ status: 200, body: tmp }));  //Return the user data

                }
            } 


            return throwError({ error: { message: 'Erreur not connue' } });
            


            // pass through any requests not handled above
            return next.handle(request);
            
        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(2000))
        .pipe(dematerialize());
    }



}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};*/