import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WewinService {
  url:String=`${
    environment.api
  }`
  constructor(private http:HttpClient) { }
  setWin(token:any,data:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':`Bearer ${ token }`
      })
    }; 
    return this.http
    .post<String>(
     this.url+"win/add",data,httpOptions);   
  }
  getWins(token:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':`Bearer ${ token }`
      })
    }; 
    console.log("tokouu",token);
    
    // getFromApiwiththisCode
    return this.http
    .get(
     this.url+"wins",httpOptions
    );
  }
}