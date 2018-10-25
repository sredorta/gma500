import { Timestamp } from "rxjs";
import {Role} from '../_models/role';
import { getMatScrollStrategyAlreadyAttachedError } from "@angular/cdk/overlay/typings/scroll/scroll-strategy";

export interface UserTokenInterface {
    token:string;
}

export interface UserMultipleAccessInterface {
    access:string;
}


export interface UserInterface {
    id?:number;
    email?:string;
    mobile?: string;
    firstName?:string;
    lastName?:string;
    avatar?: string;
    isMember?: boolean;
    isBoard?: boolean;
    isBureau?: boolean;
    title?: string;
    isEmailValidated?:boolean;
    emailValidationKey?:boolean;
    created_at?: string;
    updated_at?: string;  
}

export class User {
    id: number;
    email: string;
    mobile: string;
    password: string;
    firstName: string;
    lastName: string;
    avatar: string;
    access: string;
    roles: Role[] = new Array<Role>();
    created_at: string;
    updated_at: string;  


    groups : string[] = ["none"]
 

    getFormattedRoles() {
        let result = "";
        for (let role of this.roles) {
            if (result == "")
                result = role.name;
            else
                result = result + " / " + role.name;
        }
        return result;
    }

    hasRole(role:string) : boolean {
        return true;
    }
    
    constructor(jsonObj: any) {
        if (jsonObj!== null) {
        this.id = jsonObj.id;
        this.email = jsonObj.email;
        this.mobile = jsonObj.mobile;
        this.password = jsonObj.password;
        this.firstName = jsonObj.firstName;
        this.lastName = jsonObj.lastName;
        this.avatar = jsonObj.avatar;
        this.access = jsonObj.access;
        this.roles = new Array<Role>();
        if (jsonObj.roles != null)
            for (let role of jsonObj.roles) {
                this.roles.push(new Role(role));
            }
        this.created_at = jsonObj.created_at;
        this.updated_at = jsonObj.updated_at;
        }          
    }



    static removeToken() {
        localStorage.removeItem('jwt-token')
    }

    static saveToken(token:string) {
        localStorage.setItem('jwt-token',token);
    }
    static getToken() : string {
        return localStorage.getItem('jwt-token');
    }

    static hasValidToken() : boolean {
        console.log("Token value is: " + localStorage.getItem('jwt-token'));
        //Here we need to validate the token
        if (localStorage.getItem('jwt-token')== null) 
           return false;
        return true;
    }



/*    isPresident() {
        return (this.roles.indexOf("president")>-1?true:false);
    }
    isBoard() :boolean{
        let result:boolean = false;
        this.roles.forEach(el=> {
            if (el!== "president" && el!=="bureau" && el!=="member") {
                result = true;
            }
        });
        return result;
    }
    isBureau() {
        return (this.roles.indexOf("bureau")>-1?true:false);
    }
    isMember() {
        return (this.roles.indexOf("member")>-1?true:false);
    }

    getFormattedRoles() :string {
        let value = "";
        this.roles.forEach(res => {
            if (value === "") {
                value = value + this.getFormattedRole(res);
            } else {
                value = value + " / " + this.getFormattedRole(res); 
            }
        });        
        return value;
    }
    getFormattedRole(type:string) : string {
        let value = "";
        switch (type) {
            case "president":
                value = "Président";
                break;
            case "bureau":
                value = "Bureau";
                break;
            case "member":
                value = "Membre";
                break;
            case "board":    
                this.roles.forEach(el => {
                    if (el != "bureau" && el !="member" && el !="president") {
                        value = el.toString();
                    } 
                    if (el === "president") {
                        value = "Président";
                    }
                });   
                break            
        }
        return value;
    }
*/

}