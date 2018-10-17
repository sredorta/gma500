export class Product {
    id: number;
    image: string;
    cathegory: string;  //Cathegory: Securité,escalade... (defined in config table)
    type: string;    //ARVA...
    brand: string;      //ortovox...
    description: string;
    usage: string;
    serialNumber: string;
    idGMA: string;
    fabricatedOn : string;
    boughtOn:   string;
    expiresOn:  string;
    controls : string[] = null;
    docLink: string = null;
    comments: string[] = null;
    isAvailable: false;
    
    constructor(jsonObj: any) {
        for (let prop in jsonObj) {
            this[prop] = jsonObj[prop];
        }
    }
}