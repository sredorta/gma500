import { User } from "./../_models/user";

export class Product {
    id: number;
    image: string;
    cathegory: string;  //Cathegory: Securité,escalade... (defined in config table)
    type: string;    //ARVA...                            (Defined in config table)
    brand: string;      //ortovox...
    description: string;
    usage: string;
    serialNumber: string;
    idGMA: string;
    fabricatedOn : string;
    boughtOn:   string;
    expiresOn:  string;
    assignedTo : User = new User(null);
    controls : string[] = null;
    docLink: string = null;
    comments: string[] = null;


    //Returns if product is already assigned to someone
    isAvailable() {
        if (this.assignedTo.id == null || this.assignedTo.id == undefined) return true;
        return false;
    }
    
    constructor(jsonObj: any) {
        for (let prop in jsonObj) {
            this[prop] = jsonObj[prop];
            if (jsonObj.assignedTo != null)
                this.assignedTo = new User(jsonObj.assignedTo);
        }
    }
}