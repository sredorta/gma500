import { Component, OnInit,ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-input-document',
  templateUrl: './input-document.component.html',
  styleUrls: ['./input-document.component.scss']
})
export class InputDocumentComponent implements OnInit {

  //TODO download this from database
  doctypes :any[] = [
    {"value" : "CERTIF_2016", "viewValue" :"Certificat médical 2016"},
    {"value" : "CERTIF_2017", "viewValue" :"Certificat médical 2017"},
    {"value" : "CERTIF_2018", "viewValue" :"Certificat médical 2018"}
  ];
  selectedType : string = null;

  isLoading : boolean = false;
  //Child views for refs
  @ViewChild('fileInput') inputElem : ElementRef;           //File input element
  //Inputs
  @Input() inputDoc : string; //Path to the input doc
  @Input() processing  : boolean = false; //Emits resulting image when it changes
  @Output() onDocChange = new EventEmitter<any>(); //Emits resulting image when it changes

  constructor() { }

  ngOnInit() {
    console.log(this.doctypes);
  }

  //We have clicked on the galery fab
  openFileViewer() {
    this.inputElem.nativeElement.click();
  }


  //Checks that we have a valid format
  //Todo use inhouse dialog
  isValidFormat(file : File) {
    if (file.size >=5*1024*1024){
      alert("Size exceeded");
      return false;
    } 
    if (file.type != "application/pdf"){
      alert("wrong format");
      return false;
    }
    return true
  }


  //Load image by using the canvas
  loadDoc(event) {
    var myObject = this;
    var myFiles = event.target.files;
    var myFile = myFiles[0];
    var url = this.inputElem.nativeElement.src;
    var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    if (event.target.files && event.target.files[0]) {
      if (myObject.isValidFormat(event.target.files[0])) {
        myObject.isLoading = true;  //Loading file
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        reader.onloadend = function(event) {
          myObject.onDocChange.emit({type : myObject.selectedType, data: reader.result.toString()});
          myObject.isLoading = false; //Loading completed   
        }
      }
    }
} 
}
