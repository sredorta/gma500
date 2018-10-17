//Class that holds all configuration of the site

export class Config {
    productCathegories : any[] = null;
    productTypes :  any[] = null;
    
    constructor(jsonObj: any) {
        for (let prop in jsonObj) {
            this[prop] = jsonObj[prop];
        }
    }
}