import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:String=`${
    environment.api
  }login`
  token:any=""
  conect:boolean=false
  constructor(public http: HttpClient,private storage:Storage) {    
    this.storage.get('token').then((val) => {
      if(!(val.length===0)){
        this.token=val
      }
      
    });
  }
// login
  login(login:String,mdp:String){
    const headers = new HttpHeaders({'Content-Type': 'application/json',"Access-Control-Allow-Origin": '*'})
    return this.http
      .post<any>(
       this.url+``,
        { 'email': login,'password': mdp, returnSecureToken: true }
      );
  }
}
