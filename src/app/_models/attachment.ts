import { environment } from "../../environments/environment.prod";

export class Attachment {
    id:number;
    attachable_id: number;
    attachable_type: string;
    extension: string;
    type:string;
    function:string;
    filepath: string;
    name:string;
    created_at: string;
    updated_at  

    //Returns file full path and filename
    getFilePath() {
        return environment.storageURL + this.filepath + this.name;
    }

    //Returns path for pdf viewer
    getViewerPath() {
        return "https://drive.google.com/viewerng/viewer?embedded=true&url=" + this.getFilePath();
    }

    constructor(jsonObj: any) {
        this.id = jsonObj.id;
        this.attachable_id = jsonObj.attachable_id;
        this.attachable_type = jsonObj.attachable_type;
        this.extension = jsonObj.extension;
        this.type = jsonObj.type;
        this.function = jsonObj.function;
        this.filepath = jsonObj.filepath;
        this.name = jsonObj.name;
        this.created_at = jsonObj.created_at;
        this.updated_at = jsonObj.updated_at;
    }

}