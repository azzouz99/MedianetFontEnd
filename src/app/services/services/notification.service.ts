import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "./token/token.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private predictionUrl = "http://localhost:8080/get-prediction";
  private baseUrl = 'http://localhost:8080/notif';
  constructor(private http: HttpClient,private authService:TokenService) {

  }

  findNotificationForProjectCompleted():Observable<Notification[]>{
    const token = this.authService.token; // Assuming you have a method to get the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/completed`;
    return  this.http.get<Notification[]>(url,{headers});
  }
  findNotificationForProjectInProgress():Observable<Notification[]>{
    const token = this.authService.token; // Assuming you have a method to get the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/inprogress`;
    return this.http.get<Notification[]>(url,{headers});
  }
  checkPerformanceCompleted(){
    const token = this.authService.token; // Assuming you have a method to get the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/performance/completed`;
    return  this.http.get<any>(url,{headers});
  }
  getBystatus(status:any){
    const token = this.authService.token; // Assuming you have a method to get the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/status/${status}`;
    return  this.http.get<any>(url,{headers});
  }

}
