import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {TokenService} from "../token/token.service";

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  private baseUrl = 'http://127.0.0.1:5000/predict';
  private predictionUrl = 'http://localhost:8080/prediction';

  constructor(private http: HttpClient,private authService: TokenService) { }

  private jsonHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  predictInsertionContenu(data: any): Observable<any> {
    const url = `${this.baseUrl}/insertion_contenu`;
    return this.http.post(url, data, { headers: this.jsonHeaders });
  }

  predictIngenieurSysteme(data: any): Observable<any> {
    const url = `${this.baseUrl}/ingenieur_systeme`;
    return this.http.post(url, data, { headers: this.jsonHeaders });
  }

  predictIngenieurTest(data: any): Observable<any> {
    const url = `${this.baseUrl}/ingenieur_test`;
    return this.http.post(url, data, { headers: this.jsonHeaders });
  }

  predictSeo(data: any): Observable<any> {
    const url = `${this.baseUrl}/seo`;
    return this.http.post(url, data, { headers: this.jsonHeaders });
  }

  predictIntegration(data: any): Observable<any> {
    const url = `${this.baseUrl}/integration`;
    return this.http.post(url, data, { headers: this.jsonHeaders });
  }

  predictInfographie(data: any): Observable<any> {
    const url = `${this.baseUrl}/infographie`;
    return this.http.post(url, data, { headers: this.jsonHeaders });
  }

  predictFormation(data: any): Observable<any> {
    const url = `${this.baseUrl}/formation`;
    return this.http.post(url, data, { headers: this.jsonHeaders });
  }

  predictAll(analysteConcepteur: number, gestionCoordination: number): Observable<any> {
    let params = new HttpParams()
      .set('analysteConcepteur', analysteConcepteur.toString())
      .set('gestionCoordination', gestionCoordination.toString());
    const url = `${this.predictionUrl}/all`;
    const token = this.authService.token; // Assuming you have a method to get the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(url,{ headers,params});
  }
  predictCost(data: any[]): Observable<any> {
    const token = this.authService.token;
    const url = `${this.predictionUrl}/cost`;
    // Convert data array to JSON string and then encode it
    const params = new HttpParams().set('data', JSON.stringify(data));

    // Set up the headers with authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Send the GET request with params
    return this.http.get<any>(url, { headers,params});
  }
}
