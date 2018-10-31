export class Account {
    id: number;
    profile_id: number;
    access:string;
    created_at: string;  

    constructor(jsonObj: any) {
        this.id = jsonObj.id;
        this.profile_id = jsonObj.profile_id;
        this.access = jsonObj.access;
        this.created_at = jsonObj.created_at;
    }

}