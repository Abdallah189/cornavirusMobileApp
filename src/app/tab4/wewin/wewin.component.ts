import { Component, OnInit } from '@angular/core';
import { WewinService } from '../wewin.service';
import { Storage } from '@ionic/storage';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-wewin',
  templateUrl: './wewin.component.html',
  styleUrls: ['./wewin.component.scss'],
})
export class WewinComponent implements OnInit {
   story:any
   token:any
   testRes:boolean
   user:String
  constructor(private suc:WewinService,private storage:Storage) { 
    this.storage.get('token').then((token) => {
      this.token=token
      this.user=jwt_decode(this.token).email
      // console.log("user",this.user);    
    });
  }
  waitForOneSecond() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.suc.getWins(this.token).subscribe((Response :Response[])=>{
          console.log(Response);  
          this.story=Response
          this.testRes=true
        })
        resolve("I promise to return after one second!");
      }, 1000);
    });
  }
  promiseMethod(){
    this.waitForOneSecond().then((value) => console.log(value));
   }
   async asyncMethod() {
    const value = await this.waitForOneSecond();
    console.log(value);
   } 

  ngOnInit() {
    this.asyncMethod() 
  }
  delete(id:any){
   this.suc.del(this.token,id).subscribe((res)=>{
     console.log(res);  
     location.reload();  
   })
  }

}
