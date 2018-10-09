
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
        console.log("isPresident::::::::");
        console.log(this.roles);
        console.log(this.roles.indexOf("president")>-1?true:false);
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

    getFormattedRole(type:string) : string {
        let value = "";
        switch (type) {
            case "bureau":
                value = "Bureau";
                break;
            case "member":
                value = "Membre";
                break;
            case "board":    
                let result : string = "";
                this.roles.forEach(el => {
                    if (el != "bureau" && el !="member" && el !="president") {
                        value = el.toString();
                    } 
                    if (el === "president") {
                        value = "Président";
                    }
                });   
                break
            default: {
                this.roles.forEach(res => {
                    if (value === "") {
                        value = value + res.toString()
                    } else {
                        value = value + " / " + res.toString(); 
                    }
                });
                break;
            }                
        }
        console.log("Final value : " + value);
        return value;
    }


}