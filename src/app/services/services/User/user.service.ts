import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../models/user";
import {TokenService} from "../token/token.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/roles';

  constructor(private http: HttpClient,private authService:TokenService) { }

  getUsersByRole(role: string): Observable<User[]> {
    const token = this.authService.token; // Assuming you have a method to get the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User[]>(`${this.apiUrl}/role/${role}`,{headers});
  }
}
