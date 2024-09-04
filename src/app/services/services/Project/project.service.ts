import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "../token/token.service";
import {Observable} from "rxjs";
import {Project} from "../../models/project";
interface ProjectDrupal{
  [key: string]:number
}
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private predictionUrl = "http://localhost:8080/get-prediction";
  private baseUrl = 'http://localhost:8080/api/projet';
  constructor(private http: HttpClient,private authService:TokenService) {

  }
  getProjectsproductivity(): Observable<any> {
    const token = this.authService.token; // Assuming you have a method to get the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/productivity`;
    return this.http.get(url,{headers});
  }
getProjectDetails(){
    const token = this.authService.token;
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  const url = `${this.baseUrl}/sd`;
  return this.http.get(url,{headers});

}
  getbyStatus(status: any): Observable<any> {
    const token = this.authService.token; // Assuming you have a method to get the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/bystatus/${status}`;
    return this.http.post(url, {headers});
  }


  getprediction(analysteConcepteur: any,gestionCoordination:any): Observable<any> {

    const token = this.authService.token; // Assuming you have a method to get the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.predictionUrl}/all?analysteConcepteur=${analysteConcepteur}&gestionCoordination=${gestionCoordination}`;
    return this.http.post(url, {headers});

  }
  getProjectPredictionInprogress(): Observable<{ [key: string]: ProjectDrupal }>{
    const token = this.authService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `http://localhost:8080/api/article/drupal/predictinprogress`;
    // @ts-ignore
    return  this.http.get<{ [key: string]: ProjectDrupal }>(url,{headers});

  }
  getProjectInprogress():Observable<{ [key: string]: ProjectDrupal }>{
    const token = this.authService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `http://localhost:8080/api/article/drupal/predictinprogress`;
    return this.http.get<{ [key: string]: ProjectDrupal }>(url,{headers});

  }
  getCompletedProjects(): Observable<Project[]> {
    const token = this.authService.token; // Assuming you have a method to get the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Project[]>(`${this.baseUrl}/bystatus/COMPLETED`, { headers });
  }

}
