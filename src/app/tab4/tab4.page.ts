import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { WewinService } from './wewin.service';
import { Storage } from '@ionic/storage';
import Swal from 'sweetalert2'
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
   token:any
  constructor(private nv:NavController,private suc:WewinService,private storage:Storage) {
    this.storage.get("token").then((token)=>{
      this.token=token
      console.log("takk",jwt_decode(this.token));
    })
   }

  ngOnInit() {
  }
  goChat(){
    this.nv.navigateRoot('next/tabs/tab4/chat')
  }
  goToWin(){
    this.nv.navigateRoot('next/tabs/tab4/win')
  }
  setSucessStory(){
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'إرسال &rarr;',
      showCancelButton: true,
      cancelButtonText: ' الرجوع'

    }).queue([
      {
        title: 'انا تغلبت على الكورنا',
        text: 'إحكي لنا كيف كانت نجربتك مع مرض الكورونا',
        input: 'textarea',
        inputPlaceholder: '',
        inputAttributes: {
          'aria-label': 'Type your message here'
        }
      },         
    ]).then((result) => {
      if (result.value) {
        const answers =result.value
        let res:any
        res={content :answers[0]}
        this.suc.setWin(this.token,res).subscribe((res)=>{
          console.log(res);
          
        })
        console.log(res);        
      }
    })
  }
}
