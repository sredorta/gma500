
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


    
    static removeToken() {
        localStorage.removeItem('jwt-token')
    }

    static saveToken(token:string) {
        localStorage.setItem('jwt-token',token);
    }
    static getToken() : string {
        return localStorage.getItem('jwt-token');
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


}