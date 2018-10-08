
export class User {
    id: number;
    email: string;
    mobile: string;
    password: string;
    firstName: string;
    lastName: string;
    avatar: any;
    roles: string[] = [];   //Member, president...
    isLoggedIn : boolean = false;
    isValidated : boolean = false;
    groups : string[] = ["none"]
 
    
    constructor(jsonObj: any) {
        for (let prop in jsonObj) {
            this[prop] = jsonObj[prop];
        }
    }
    isPresident() {
        return (this.roles.indexOf("president")>-1);
    }
    isBoard() {
        return false;
    }
    isBureau() {
        return (this.roles.indexOf("bureau")>-1);
    }
    isMember() {
        return (this.roles.indexOf("member")>-1);
    }
    getRoles() {
        return "test";
        return this.roles.toString();
    }


}