import { Timestamp } from "rxjs";
import {Role} from '../_models/role';
import {Notif} from '../_models/notif';
import {Account} from '../_models/account';

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
    accounts: Account[] = new Array<Account>();
    notifsUnreadCount: number = 0; 
    created_at: string;
    updated_at: string;  


    groups : string[] = ["none"]
 
    //Returns if we have an user (i.e. we are logged in for current user!)
    isAvailable() :boolean {
        if ((this.id !== null) && (this.id !== undefined)) return true;
        return false;
    }
    isPresident() {
        return this.roles.filter(item => item.id === 3).length;
    }
    //Need to add here hasAccess
    hasAccess(access:string) {
        return this.access === access;
    }
/*
    hasRole(role:string) : boolean {
        return true;
    }
    */
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
        if (jsonObj.accounts != null)
            for (let account of jsonObj.accounts) {
                this.accounts.push(new Account(account));
            }    
        this.notifsUnreadCount = jsonObj.notifsUnreadCount;
        /*if (jsonObj.notifications != null)
            for (let notif of jsonObj.notifications) {
                this.notifs.push(new Notif(notif));
            }    */
        this.created_at = jsonObj.created_at;
        this.updated_at = jsonObj.updated_at;
        }          
    }


    /////////////////////////////////////////////////////////////////////////
    // Token related
    /////////////////////////////////////////////////////////////////////////
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
        //Here we need to validate the token
        if (localStorage.getItem('jwt-token')== null) 
           return false;
        return true;
    }

    /////////////////////////////////////////////////////////////////////////
    // Roles related
    /////////////////////////////////////////////////////////////////////////
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

    /////////////////////////////////////////////////////////////////////////
    // Notifs related
    /////////////////////////////////////////////////////////////////////////
/*    getNotifsUnreadCount() : number {
        return this.notifs.filter(item => item.isRead == false).length;
    }*/


}