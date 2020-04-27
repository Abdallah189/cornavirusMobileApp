import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import Swal from 'sweetalert2'
import { NavController } from '@ionic/angular';
import { UserService } from './user.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  user: any
  err:boolean=false;
  token:any
  login:any
  tok:any
  connect:boolean
  src="../../assets/icon/thumbs-up-solid.svg"
  constructor(private form:FormBuilder,private nv:NavController,private userService:UserService,public localNotifications: LocalNotifications,private storage: Storage) { 
    this.storage.get('user').then((val) => {
      this.login=val
      // console.log('Your login', val);
    });
    this.storage.set('token',"")  
    this.storage.set('connect',false)
    this.storage.get('token').then((val) => {
      this.tok=val
      console.log('Your psw', this.tok.length);
    });
    this.storage.get('connect').then((val) => {   
      this.connect=val
      if (this.connect || !(this.tok.length === 0)) {
        this.nv.navigateRoot('next/tabs/tab2')
       }
       console.log(this.connect);
    });
    console.log("token",this.userService.token);  
   
  }

  ngOnInit() {
    this.user=this.form.group({
      'mdp':'',
      'idf':''
    })  
   

    // this.userService.login(this.login,this.psw).subscribe((Response :Response[])=>{
    //   this.userService.token=Response['token']
    //   this.storage.set('user', this.user);
    //   this.storage.set('psw', this.psw);
    //   this.storage.set('token', this.userService.token);
    //   this.storage.set('connect', true);
    //   this.userService.conect=true
    //   console.log(this.userService.conect);
    //   if (this.userService.conect) {
    //     this.err=false
    //     this.nv.navigateRoot('next/tabs/tab2')
    //   }  
    // },
    // (err) => {
    //   this.storage.set('token', "");
    //   this.storage.set('connect', false);
    //   console.log(err)
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'خطأ ',
    //     confirmButtonText:'<ion-icon src="../../assets/icon/thumbs-up-solid.svg" style=""></ion-icon> حسنا',
    //     confirmButtonColor:'red',
    //     text: 'ليس هناك  اي حساب تحت هذا الرقم الرجاء التثبت',
    //     footer: '<a href>طلب انشاء حساب</a>'
    //   })
    // })
  
  }

  setSound() {
      return 'file://assets/sound.mp3'
  }
  setimg(){
    return 'file://assets/bell.png'
  }

  onSubmit(val){
    this.localNotifications.schedule({
      id: 1,
      icon:'../../assets/icon/quote.svg',
      smallIcon: 'res://notification',
      text: 'you must ..........',
      sound: '../../assets/sound.mp3' ,
      data: { secret: 1 }
    });
    this.localNotifications.schedule({
      id: 1,
      icon: this.setimg(),
      smallIcon: 'res://notification',
      text: 'Chaque 24 heures',
      sound: './../../assets/good-things-happen.mp3' ,
      trigger: {at: new Date(new Date().getTime() + 120)},
      led: 'FF0000',
      data: { secret: 1 }
    });
    this.localNotifications.schedule({
      text: 'Delayed ILocalNotification',
      icon:this.setimg(),
      smallIcon: 'res://notification',
      trigger: {at: new Date(new Date().getTime() + 5000)},
      led: 'FF0000',
      sound: this.setSound(),
      vibrate:true,
   });
     console.log(this.userService.url);
    console.log(this.userService.login(val.idf,val.mdp));
    this.userService.login(val.idf,val.mdp).subscribe((Response :Response[])=>{
      this.userService.token=Response['token']
      // this.storage.set('user', val.idf);
      // this.storage.set('psw', val.mdp);
      this.storage.set('token', this.userService.token);
      this.storage.set('connect', true);
      this.userService.conect=true
      console.log(Response['token']);
      console.log(this.userService.conect);
      if (this.userService.conect) {
        this.err=false
        this.nv.navigateRoot('next/tabs/tab2')
      }
      // else {
      //   this.err=true
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'خطأ ',
      //     confirmButtonText:'<ion-icon src="../../assets/icon/thumbs-up-solid.svg" style=""></ion-icon> حسنا',
      //     confirmButtonColor:'red',
      //     text: 'ليس هناك  اي حساب تحت هذا الرقم الرجاء التثبت',
      //     footer: '<a href>طلب انشاء حساب</a>'
      //   })
      // }    
    },
    (err) => {
      this.storage.set('token', "");
      this.storage.set('connect', false);
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'خطأ ',
        confirmButtonText:'<ion-icon src="../../assets/icon/thumbs-up-solid.svg" style=""></ion-icon> حسنا',
        confirmButtonColor:'red',
        text: 'ليس هناك  اي حساب تحت هذا الرقم الرجاء التثبت',
        footer: '<a href>طلب انشاء حساب</a>'
      })
    })
    // if (this.userService.login(val.idf,val.mdp)) {
    // this.token="";
    // }else{
    //   this.nv.navigateRoot('next/tabs/tab2')
    // }
      
    // if (!this.user.conect) {
    //   this.err=true
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'خطأ ',
    //     confirmButtonText:'<ion-icon src="../../assets/icon/thumbs-up-solid.svg" style=""></ion-icon> حسنا',
    //     confirmButtonColor:'red',
    //     text: 'ليس هناك  اي حساب تحت هذا الرقم الرجاء التثبت',
    //     footer: '<a href>طلب انشاء حساب</a>'
    //   })
    // }else{
    //   this.err=false
    //   this.nv.navigateRoot('next/tabs/tab2')
    // }
  }
}
