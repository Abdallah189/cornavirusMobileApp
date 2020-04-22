import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSlides, NavController, LoadingController } from '@ionic/angular';
import {questions} from './../questions';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReponseService } from '../reponse.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit{
  private questions=questions
  @ViewChild('slides',{static: true}) ionSlides: IonSlides;

  selectedAll=false;
  // private question=questions
  token:any
  disablePrevBtn = true;
  disableNextBtn = false;
  reponse:any=[];
  questionRep:String
  respo:any
  lat:any
  logn:any
  SendBody:any=[]
  date=new Date()
  mm=Number(this.date.getMonth())+1
  SendBodyFinal:any={createdAt:this.date.getDate()+'-'+this.mm+'-'+this.date.getFullYear(),questions:[],feedback:" "}
  constructor(private form:FormBuilder,private rp:ReponseService,private nv:NavController,private geolocation: Geolocation,private loadingController: LoadingController,private storage:Storage) {
    this.storage.get('token').then((val) => {
      this.token=val
    });
  }
  ngOnInit(){
 
    console.log(this.date);
       
    // this.rep=this.form.group({
    //   'q1':FormControl,
    //   'q2':FormControl,
    //   'q3':FormControl,
    //   'q4':FormControl,
    //   'q5':FormControl
    //  })
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat=resp.coords.latitude
      this.logn=resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
    for (let index = 0; index < this.questions.length; index++) {
      this.reponse.push({id :this.questions[index].id,question :this.questions[index].des , reponse :'',indexSlide:this.questions[index].slideIndex})
    }
    // this.reponse.push({id :'questFn',question :"dernier question" , reponse :''})
    // this.reponse.push({id :'localisation',longitude :"" , latitude :''})

    console.log(this.questions);  
  }


  addValue(id,des,indexSli,e): void {
    console.log(des);
    console.log(e.detail);
    // console.log(e.currentTarget.id);
    // console.log(this.reponse);
    // for (let index = 0; index < this.questions.length; index++) {
    //   if(this.questions[index].resp.tr && this.questions[index].resp.fl) {
    //     this.questions[index].resp.tr=false;
    //     this.questions[index].resp.fl=false;
    //   }    
    // }

    for (let index = 0; index < this.reponse.length; index++) {
      if(id==this.reponse[index].id){
       this.reponse[index].reponse=e.detail.value;
       this.reponse[index].indexSlide=indexSli;
      }        
    } 
    // this.respo=this.questions
    
}

async presentLoading() {
  const loading = await this.loadingController.create({
    message: 'Please wait...',
    duration: 2000
  });
  await loading.present();

  const { role, data } = await loading.onDidDismiss();
  console.log('Loading dismissed!');
}
  onSubmit(slides){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat=resp.coords.latitude
      this.logn=resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
    console.log('sumbit');
    
    var test=true;
    for (let index = 0; index < this.reponse.length; index++) {
      this.SendBody[index]={title:this.reponse[index].question,response:this.reponse[index].reponse}
    }
    this.SendBody[this.reponse.length]={title:'longitude',response:this.logn.toString()}
    this.SendBody[this.reponse.length+1]={title:'latitude',response:this.lat.toString()}

    for (let index = 0; index < this.reponse.length; index++) {
      if(this.reponse[index].reponse==""){
        Swal.fire({
          icon: 'error',
          title: 'خطأ ',
          confirmButtonText:'<ion-icon src="../../assets/icon/thumbs-up-solid.svg" style=""></ion-icon> حسنا',
          confirmButtonColor:'red',
          text :'يجب اكمال ملئ المعطيات'+'latitude '+this.lat+' longitude '+this.logn
        })
        slides.slideTo(this.reponse[index].indexSlide);
         test=false;
      }
      }
      if (test) {
        Swal.mixin({
          input: 'text',
          confirmButtonText: 'إرسال &rarr;',
          showCancelButton: true,
          cancelButtonText: ' الرجوع'

        }).queue([
          {
            input: 'textarea',
            inputPlaceholder: 'أظف معلومات و نوع اخر من الارهاق ان كان لديك',
            inputAttributes: {
              'aria-label': 'Type your message here'
            }
          },         
        ]).then((result) => {
          if (result.value) {
            this.questionRep=result.value[0]
            const answers = JSON.stringify(result.value)
            console.log(result.value[0]);
            // this.SendBody.push({titre:'description final',reponse:result.value[0]})
            // this.SendBodyFinal=JSON.parse(this.SendBodyFinal)
            this.SendBodyFinal.feedback=result.value[0]
            this.SendBodyFinal.questions=this.SendBody
            console.log('FN',this.SendBodyFinal);
            
            console.log(JSON.stringify(this.SendBodyFinal));
            // console.log(JSON.parse(JSON.stringify(this.SendBodyFinal)));
           
            console.log('Your psw', this.token);

            this.rp.reponsePost(this.SendBodyFinal,this.token).subscribe((Response)=>{
              // this.presentLoading();
              if(Response['message']=="Survey created"){
                Swal.fire({
                  icon: 'success',
                  title: 'شكرا لك  ',
                  confirmButtonText:'<ion-icon src="../../assets/icon/thumbs-up-solid.svg" style=""></ion-icon> حسنا',
                  confirmButtonColor:'red',
                  text: ' سنجيبك قريبا و نتمنى لك الشفاء العاجل',
                })
                this.nv.navigateRoot('next/tabs/tab2')            
                location.reload(); 
              }else{
                Swal.fire({
                  icon: 'error',
                  title: 'شكرا لك  ',
                  confirmButtonText:'<ion-icon src="../../assets/icon/thumbs-up-solid.svg" style=""></ion-icon> حسنا',
                  confirmButtonColor:'red',
                  text: ' سنجيبك قريبا و نتمنى لك الشفاء العاجل',
                })
              }
              // console.log(Response); 
              
            },
            (err) => {
              console.log(err)
            })
           
            // location.reload();
          }
        })     
        // location.reload();
        // this.reponse[this.questions.length].reponse=this.questionRep
        // this.reponse[this.questions.length+1].longitude=this.logn;
        // this.reponse[this.questions.length+1].latitude=this.lat;
        // console.log('reponse',JSON.stringify(this.reponse));
        
      //  console.log(JSON.stringify(this.SendBody));
      } 

    // for (let index = 0; index < this.questions.length; index++) {
    //   this.questions[index].resp.tr=false;
    //   this.questions[index].resp.fl=false;
    // }
    // location.reload();
    // this.nv.navigateRoot('next/tabs/tab2')
  }

  next(slides){
    slides.slideNext(); 
    // slides.slideTo(3);
  }
  pred(slides){
    slides.slidePrev();
  }
  doCheck() {
    let prom1 = this.ionSlides.isBeginning();
    let prom2 = this.ionSlides.isEnd();

    Promise.all([prom1, prom2]).then((data) => {
      data[0] ? this.disablePrevBtn = true : this.disablePrevBtn = false;
      data[1] ? this.disableNextBtn = true : this.disableNextBtn = false;
    });
  }
  
}
