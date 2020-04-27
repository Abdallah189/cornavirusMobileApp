import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  currentUser ='khaled';
  newMsg = '';
  
  @ViewChild('content', { static: false }) content: IonContent;
   url = new URL('http://localhost:3000/.well-known/mercure');
  ngOnInit() {

    this.url.searchParams.append('topic', 'http://example.com/books/1');
    // Subscribe to updates of several Book resources
    this.url.searchParams.append('topic', 'http://example.com/books/2');
    // All Review resources will match this pattern
    this.url.searchParams.append('topic', 'http://example.com/reviews/{id}');

    const eventSource = new EventSource(this.url+"");
    eventSource.onmessage = event => {
      console.log(JSON.parse(event.data));
    }

  }

    messages = [
      {
        user: 'khaled',
        createdAt: 133333,
        msg: 'السلام عليكم '
      },
      {
        user: 'rojlaa',
        createdAt: 133333,
        msg: 'السلام مرحبا بيك انا الدكيور امين بش نجم نعاونك'
      },
      {
        user: 'khaled',
        createdAt: 133333,
        msg: 'راني خايف يا دكتور ملقيت منعمل تعبني برشا المرض و منجم نحكي معا حد و قلقت حابب نخرج' 
      },
      {
        user: 'rojlaa',
        createdAt: 133333,
        msg: 'مفماش حاجة تخليك تخاف الفيرويس ضعيف و بدنك اقوى منوا اما كي تخرج و قتها بش يضعف بدنك كي تشوف الي تحبوا خيف عليك و انتي خيف عليه و الاصعب كي تعطيه الفيرويس و انتي تشفي و هوا بعد ينجم يرجعلك الفيريس و نقل المرض للي تحبوه شوف تجارب الي تعفاوا قبلك وبش ينصحوك'
      },
    ];
  
    constructor() {}
  
  sendMessage(){
    this.messages.push({
      user:'khaled',
      createdAt:new Date().getTime(),
      msg:this.newMsg
    });
    this.newMsg='';
    setTimeout(() =>{
    this.content.scrollToBottom(300);
    });
  }
  


}
