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
    docLink: string = null;
    profile_id: number;                 //If Product is assigned to somebody
    assignedTo : any = null; //To whom is assigned
    controls : string[] = null;
    comments: string[] = null;


    //Returns if product is already assigned to someone
    isAvailable() {
        if (this.profile_id == null || this.profile_id == undefined) return true;
        return false;
    }
    
    constructor(jsonObj: any) {
        for (let prop in jsonObj) {
            this[prop] = jsonObj[prop];
            if (jsonObj.assignedTo != null)
                this.assignedTo = jsonObj.assignedTo;
        }
    }
}