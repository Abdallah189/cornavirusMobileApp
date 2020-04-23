import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { WewinService } from './wewin.service';
import { Storage } from '@ionic/storage';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private nv:NavController,private suc:WewinService,private storage:Storage) { }

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
        const answers = JSON.stringify(result.value)
        console.log(answers);        
      }
    })
  }
}
