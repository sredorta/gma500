
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
    getRoles() {
        return "test";
        return this.roles.toString();
    }


}