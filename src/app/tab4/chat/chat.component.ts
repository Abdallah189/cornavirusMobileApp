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
  //  url = new URL('http://198.168.1.11:3000/.well-known/mercure');
  //  hub:any
  messages = [];
  ngOnInit() {
  //   let loadData = (url)=> {
  //     fetch(url).then(response => {
  //         const hubUrl = response.headers.get('Link').match(/<([^>]+)>;\s+rel=(?:mercure|"[^"]*mercure[^"]*")/)[1];
  //         this.hub = new URL(hubUrl);
  //         this.hub.searchParams.append('topic', 'http://send.com/send');
  //         const eventSource = new EventSource(this.hub,{withCredentials:true});
  //         console.log(eventSource);
  //         eventSource.onmessage = event => {
  //             console.log('never givUP') ;
  //             let data = event.data;
  //             console.log(data);
  //             console.log("run");
  //         }
  //     });
  // };
  //  loadData("http://192.168.1.11:8000/")

 
  }

  envoyez(){
    setTimeout(() => {
      this.messages.push({
        user: 'rojlaa',
        createdAt: 133333,
        msg: "Hello I'am doctor iskander"
      })
    }, 4000);
    setTimeout(() => {
      this.messages.push( {
        user: 'rojlaa',
        createdAt: 133333,
        msg: 'can i help you'
      })
    }, 7000);
  }
 
  
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
