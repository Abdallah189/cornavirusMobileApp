import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './auth/user.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
const axios = require('axios');

@Injectable({
  providedIn: 'root'
})
export class ReponseService {
  url:String=`${
    environment.api
  }`
  token:any
  exempleResponse:any=[
    {
     titre:'الإجابة',
     des:'كتيييييييييييييييييييييييييييييييييبة',
     date: '11:00h 20/04/2020'
    },
    {
      titre:'الإجابة',
      des:'كتيييييييييييييييييييييييييييييييييبة',
      date: '11:00h 10/04/2020'
     },
     {
      titre:'الإجابة',
      des:'كتيييييييييييييييييييييييييييييييييبة',
      date: '11:00h 5/04/2020'
     },
     {
      titre:'الإجابة',
      des:'كتيييييييييييييييييييييييييييييييييبة',
      date: '11:00h 3/04/2020'
     },
     {
      titre:'الإجابة',
      des:'كتيييييييييييييييييييييييييييييييييبة',
      date: '11:00h 1/04/2020'
     }
  ]
  constructor(private http:HttpClient,private userService:UserService,private storage:Storage) { 
   
    this.storage.get('token').then((val) => {      
      this.token=val
      // console.log('Your psw', this.val.length);
    });
  }

  
  reponsePost(data:any,token:any):Observable<any>{
    var headers = new Headers();
    headers.set('Authorization', 'Bearer my-token'); 
    // let options = new RequestOptions({ headers: headers });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':`Bearer ${ token }`
      })
    }; 
    return this.http
    .post<String>(
     this.url+"survey/add",data,httpOptions);
  }
  getResponse(token:any){ 

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':`Bearer ${ token }`
      })
    }; 
    console.log("tokouu",this.token);
    
    // getFromApiwiththisCode
    return this.http
    .get(
     this.url+"answer",httpOptions
    );
    //gettest
    // return this.exempleResponse;
  }
getAnswer(token:any){
console.log(token);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':`Bearer ${ token }`
      })
    };
    const instance = axios.create({
  baseURL: this.url+"answer",
  headers: {
    'Content-Type':  'application/json',
    'Authorization':`Bearer ${ token }`
  }
});
instance.get()
  .then(function (response) {
    // handle success
    // return response
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    return error
    console.log(error);
  })
  .finally(function () {
    return null;
    // always executed
  });
  }
}
