
export class User {
    id: number;
    email: string;
    mobile: string;
    password: string;
    firstName: string;
    lastName: string;
    avatar: any;
    role: string = "member";   //Member, president...
    isLoggedIn : boolean = false;
    isValidated : boolean = false;
    groups : string[] = ["none"]
 
    
    constructor(jsonObj: any) {
        for (let prop in jsonObj) {
            this[prop] = jsonObj[prop];
        }
    }
 /*   getAvatarUrl() {
        return "url(" + this.avatar + ")";
    }*/

}