import { Component, OnInit } from '@angular/core';
import { ReponseService } from '../reponse.service';
import { Storage } from '@ionic/storage';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  myResponse:any
  token:any
  testRes:boolean
  constructor(private resp:ReponseService,private storage: Storage,private user:UserService) {
    this.storage.get('token').then((token) => {
      this.token=token
    }); 
  }
 async toke(){
  await this.storage.get('token').then((token) => {
    return token
  });
  }
  waitForOneSecond() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.resp.getResponse(this.token).subscribe((Response :Response[])=>{
          console.log(Response);  
          this.myResponse=Response   
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
  ngOnInit(){
    // this.storage.get('token').then((token) => {
    //   console.log("resp",this.resp.getAnswer(token));
    // });
    
    this.asyncMethod() 
    // console.log("response",this.resp.getResponse());
    
    
  }
}
