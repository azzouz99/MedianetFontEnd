import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {TokenService} from "../token/token.service";
import {Observable} from "rxjs";
import {Article} from "../../models/article";
import {ArticleAnalysis} from "../../models/ArticleAnalysis";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private baseUrl = 'http://localhost:8080/api/article';
  constructor(private http: HttpClient,private authService:TokenService) {

  }
  getProjectNamesByArticle(articleID:any): Observable<String> {
    const token = this.authService.token; // Assuming you have a method to get the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/byproject/${articleID}`;
    return this.http.get<String>(url,{headers});
  }
  getArticleAnalysis(): Observable<ArticleAnalysis[]> {
    const token = this.authService.token; // Assuming you have a method to get the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/article-analysis`;
    return this.http.get<ArticleAnalysis[]>(url,{headers});
  }
  clearall(){
    const token = this.authService.token; // Assuming you have a method to get the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/clear`;
    return this.http.delete(url,{headers});
  }
  exportStructure(){
    const token = this.authService.token; // Assuming you have a method to get the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/export`;
    return this.http.get(url,{headers, responseType: 'blob'});
  }
}
