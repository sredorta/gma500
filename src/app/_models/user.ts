
export class User {
    id: number;
    email: string;
    mobile: string;
    firstName: string;
    lastName: string;
    avatar: any;
    role: string = "member";   //Member, president...
    isLoggedIn : boolean = false;
    isValidated : boolean = false;
    groups : string[] = ["none"]

 /*   getAvatarUrl() {
        return "url(" + this.avatar + ")";
    }*/

}