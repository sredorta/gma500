import { Timestamp } from "rxjs";
import {Role} from '../_models/role';
import {Group} from '../_models/group';
import {Notif} from '../_models/notif';
import {ImageSizes} from '../_models/image';
import {Account} from '../_models/account';
import {Product} from '../_models/product';
import {Attachment} from '../_models/attachment';
import { environment } from '../../environments/environment';
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
    attachments : Attachment[] = new Array<Attachment>();
    roles: Role[] = new Array<Role>();
    groups: Group[] = new Array<Group>();
    products: Product[] = new Array<Product>();
    accounts: Account[] = new Array<Account>();

    notifsUnreadCount: number = 0; 
    created_at: string;
    updated_at: string;  
 
    //Returns if we have an user (i.e. we are logged in for current user!)
    isAvailable() :boolean {
        if ((this.id !== null) && (this.id !== undefined)) return true;
        return false;
    }
    isPresident() {
        return this.roles.filter(item => item.name === "Président").length;
    }
    //Need to add here hasAccess
    hasAccess(access:string) {
        return this.access === access;
    }

 
    getAvatar(size : ImageSizes) {
        switch (size) {
            case ImageSizes.micro: return "url("+ environment.storageURL + this.avatar + "/30.jpeg)";
            case ImageSizes.tiny: return "url("+ environment.storageURL + this.avatar + "/50.jpeg)";
            case ImageSizes.small: return "url("+ environment.storageURL + this.avatar + "/100.jpeg)";
            case ImageSizes.medium: return "url("+ environment.storageURL + this.avatar + "/200.jpeg)";
            case ImageSizes.large: return "url("+ environment.storageURL + this.avatar + "/500.jpeg)";
            default : return "url("+ environment.storageURL + this.avatar + "/orig.jpeg)";
        }
    }

    //Get only documents from user
    getDocuments() {
        //console.log("Documents:");
        //console.log(this.attachments.filter(i => i.extension === "pdf"));
        return (this.attachments.filter(i => i.extension === "pdf"));
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
        this.avatar =  jsonObj.avatar;
        this.access = jsonObj.access;
        this.roles = new Array<Role>();
        if (jsonObj.roles != null)
            for (let role of jsonObj.roles) {
                this.roles.push(new Role(role));
            }
        if (jsonObj.attachments != null)
            for (let document of jsonObj.attachments) {
                this.attachments.push(new Attachment(document));
            }    
        if (jsonObj.accounts != null)
            for (let account of jsonObj.accounts) {
                this.accounts.push(new Account(account));
            }           
        if (jsonObj.groups != null)
            for (let group of jsonObj.groups) {
                this.groups.push(new Group(group));
            }     
        if (jsonObj.products != null)
            for (let product of jsonObj.products) {
                this.products.push(new Product(product));
            }             
        this.notifsUnreadCount = jsonObj.notifsUnreadCount;
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