/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface UploadUserImage$Params {
  body?: FormData;
}

export function uploadUserImage(http: HttpClient, rootUrl: string, params?: UploadUserImage$Params, context?: HttpContext): Observable<StrictHttpResponse<{}>> {
  const rb = new RequestBuilder(rootUrl, uploadUserImage.PATH, 'post');
  if (params) {
    rb.body(params.body);
  }

  const token = localStorage.getItem('authToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return http.request(
    rb.build({
      responseType: 'json',
      accept: '*/*',
      context
    })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{}>;
    })
  );
}

uploadUserImage.PATH = '/user/upload';
