
import { HostListener, Component, OnInit,ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FlexLayoutModule  } from "@angular/flex-layout";
import { FormControlName } from '@angular/forms';
@Component({
  selector: 'app-input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.scss']
})
export class InputImageComponent implements OnInit {
  isImgLoaded : boolean;    //Stores if image has been loaded or default is loaded
  imgSize : number = 10;   //Final size of the image cropped

  constructor() { }

  //Inputs
  @Input() inputImg : string;
  @Input() defaultImg : string;
  @Input() isInputEnabled : boolean;
  @Output() onImageChange = new EventEmitter<string>(); //Emits resulting image when it changes

  //Child views for refs
  @ViewChild('fileInput') inputElem : ElementRef;           //File input element
  @ViewChild('realImg') realImgElem : ElementRef;           //Real image element
  @ViewChild('shadowImg') shadowImgElem : ElementRef;       //Shadow image for manipulation
  @ViewChild('shadowCanvas') shadowCanvasElem : ElementRef; //Shadow canvas for manipulation

  //OnInit
  ngOnInit() {

    if (this.isInputEnabled==null) {
      this.isInputEnabled = true;
    }
    console.log(this.defaultImg);
    if (this.defaultImg != null) {
      //this.defaultImg = "./assets/img/no-photo.png";
      this.realImgElem.nativeElement.src = "url("+this.defaultImg+")";
      this.onImageChange.emit(this.defaultImg);  //Emit the new image
    }
    this.isImgLoaded = false;

    //If there is input we need to update canvas and shadow image with our image for rotation later
    if (this.inputImg != null) {
      this.shadowImgElem.nativeElement.src = this.inputImg;
      this.realImgElem.nativeElement.src = this.inputImg;
      this.onImageChange.emit(this.inputImg);  //Emit the new image
      this.shadowImgToCanvas();
      this.isImgLoaded = true;
    }
  }
  //Sets the shadow image to the canvas and returns the resulting base65
  shadowImgToCanvas() {
    var img = this.shadowImgElem.nativeElement;    
    var destSize = this.imgSize;    
    var canvas = this.shadowCanvasElem.nativeElement;    
    var ctx =canvas.getContext('2d');
    var sourceSize;
    var sourceWidth = img.width;
    var sourceHeight = img.height;
    var ratio;
    if (sourceWidth>=sourceHeight) {
        var sourceX = (sourceWidth - sourceHeight)/2;
        var sourceY = 0;
        sourceSize=sourceHeight;
    } else {
        var sourceX = 0;
        var sourceY = (sourceHeight - sourceWidth)/2;
        sourceSize=sourceWidth;
    }
    canvas.width = destSize;
    canvas.height= destSize;
    ctx.clearRect(0,0,canvas.width, canvas.heigth);
    ctx.drawImage(img, sourceX,sourceY, sourceSize, sourceSize, 0, 0, destSize,destSize);
    this.onImageChange.emit(canvas.toDataURL());  //Emit the new image   
    return canvas.toDataURL();      
  }

  //Restore default image
  resetImage() {
    this.realImgElem.nativeElement.src = this.defaultImg;
    this.isImgLoaded = false;
    this.onImageChange.emit(this.defaultImg);  //Emit the new image
  }

  //We have clicked on the galery fab
  openFileViewer() {
    this.inputElem.nativeElement.click();
  }

  //Load image by using the canvas
  loadImage(event) {
    var canvas = this.shadowCanvasElem.nativeElement;
    var img = this.shadowImgElem.nativeElement;
    var result = this.realImgElem.nativeElement;
    var destSize = this.imgSize;
    var myObject = this;
    var myFiles = event.target.files;
    var myFile = myFiles[0];
    var url = this.inputElem.nativeElement.src;
    var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.shadowImgElem.nativeElement.src = reader.result; //event.target.result;

      }
      reader.onloadend = function(event) {
        result.src = myObject.shadowImgToCanvas();     
    }
    this.isImgLoaded = true;
  }
} 


//Rotate the image by rotating the canvas
rotateImage() {
  if (this.isImgLoaded == true) {
    var angle = Math.PI / 2;
    var canvas = this.shadowCanvasElem.nativeElement;
    var img = this.shadowImgElem.nativeElement;
    var result = this.realImgElem.nativeElement;
    var emitter = this.onImageChange;
    var isImgLoaded = this.isImgLoaded;
    var ctx =canvas.getContext('2d');
    var myImageData = ctx.getImageData(0, 0, this.imgSize, this.imgSize);
    myImageData = new Image();
    myImageData.src = canvas.toDataURL();

    myImageData.onload = function () {
      var cw = canvas.width;
      var ch = canvas.height;

      ctx.save();
      // translate and rotate
      ctx.translate(cw, ch / cw);
      ctx.rotate(angle);
      // draw the previows image, now rotated
      ctx.drawImage(myImageData, 0, 0);     
      result.src = canvas.toDataURL();
      ctx.restore();
      emitter.emit("url("+result.src+")");  //Emit the new image

      // clear the temporary image
      myImageData = null;       
    }
  }
}

} //End of component class