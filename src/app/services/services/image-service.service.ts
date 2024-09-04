import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  // Replace with your image URL
  private authToken = 'your-auth-token'; // Replace with your authentication token

  constructor(private http: HttpClient) { }

  getImage( imageUrl: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });
    return this.http.get(imageUrl, { headers, responseType: 'blob' });
  }
}
