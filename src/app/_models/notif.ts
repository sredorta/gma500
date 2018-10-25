//Use Notif as Notification is reserved class
export class Notif {
    id: number;
    text: string;
    isRead: boolean;
    created_at: string;  

    constructor(jsonObj: any) {
        this.id = jsonObj.id;
        this.text = jsonObj.text;
        this.isRead = jsonObj.isRead==1?true:false;
        this.created_at = jsonObj.created_at;
    }

}