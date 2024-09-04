import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {map} from "rxjs/operators";
import {TokenService} from "../token/token.service";

@Injectable({
  providedIn: 'root'
})
export class UploadfileService {
private uploadUrl= 'http://localhost:8080/api/article/upload';
  constructor(private http:HttpClient,private authService:TokenService) { }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const token = this.authService.token; // Assuming you have a method to get the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.uploadUrl, formData, { headers, observe: 'events', reportProgress: true })
      .pipe(
        map(event => this.getEventMessage(event, file)),
        catchError(this.handleError)
      );
  }

  private getEventMessage(event: any, file: File): string {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        const percentDone = Math.round(100 * event.loaded / event.total);
        return `File "${file.name}" is ${percentDone}% uploaded.`;

      case HttpEventType.Response:
        return `File "${file.name}" was successfully uploaded!`;

      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('File upload error', error);
    return throwError('Error uploading file. Please try again later.');
  }
}
