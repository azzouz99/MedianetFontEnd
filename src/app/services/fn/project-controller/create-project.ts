/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Project } from '../../models/project';

export interface CreateProject$Params {
  id: number;
      body: Project
}

export function createProject(http: HttpClient, rootUrl: string, params: CreateProject$Params, context?: HttpContext): Observable<StrictHttpResponse<Project>> {
  const rb = new RequestBuilder(rootUrl, createProject.PATH, 'post');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Project>;
    })
  );
}

createProject.PATH = '/api/projet/create/{id}';
