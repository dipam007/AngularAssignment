import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export class MyImg{
  constructor(
    public cnt: number=0,
    public id: number,
    public image: string, 
    public title: string,
    public description: string,
    public active: boolean=false
  ){

  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  myImg: MyImg[];
  title = 'imageProject';
  range = 1;
  selectedImg: Array<string>[];
  countSelectedImg=0;

  constructor(
    private httpClient: HttpClient
  ){
    this.myImg = [];
    this.selectedImg = [];
  }

  changeRange(val: any){
    this.range = Number(val)+1;
  }

  deleteImg(title:any) {
    const index: number = this.selectedImg.indexOf(title);
    if (index !== -1) {
        this.selectedImg.splice(index, 1);
    }        
}

  changeActive(id: any, title: any){
    // console.log(id);
    let el: HTMLElement = document.getElementById(id) as HTMLElement;
    if(el.style.backgroundColor == "lightgray"){
      el.style.backgroundColor = "blue";
      this.selectedImg.push(title);
    }
    else{
      el.style.backgroundColor = "lightgray";
      this.deleteImg(title)
    }  
    for (let i = 0; i < this.myImg.length; i++){
      this.myImg[i].cnt=0;
    }
    let count=1;
    this.countSelectedImg=0;
    for (let i = 0; i < this.myImg.length; i++) {
      for(let j=0;j<this.selectedImg.length;j++){
        let s1 = this.selectedImg[j].toString();
        let s2 = this.myImg[i].title.toString();
        if(s1 == s2){
          this.myImg[i].cnt = count;
          count++;
          this.countSelectedImg++;
        }
      }
    }
    // console.log(this.selectedImg);
  }

  ngOnInit(): void {
    this.getImages();
  }

  getImages(){
    return this.httpClient.get<any>('https://fakestoreapi.com/products/').subscribe(
      response => {
        // console.log(response);
        this.myImg = response;
      }
    );
  }
}
