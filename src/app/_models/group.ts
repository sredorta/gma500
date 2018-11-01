export class Group {
    id: number;
    name: string;
    description: string;  

    constructor(jsonObj: any) {
        this.id = jsonObj.id;
        this.name = jsonObj.name;
        this.description = jsonObj.description;
    }
}