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
     this.url+"successstory",data,httpOptions);   
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
     this.url+"successstories/accepted",httpOptions
    );
  }
  del(token:any,id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':`Bearer ${ token }`
      })
    }; 
    return this.http
    .delete<String>(
     this.url+"successstory/delete/"+id,httpOptions); 
  }
}
