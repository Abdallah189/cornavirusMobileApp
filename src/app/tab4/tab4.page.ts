import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private nv:NavController) { }

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
        title: 'انا غلبتوا',
        text: 'أحكيلنا على قصتك مع الكورونا و كيفاش تغلبت عليه',
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
