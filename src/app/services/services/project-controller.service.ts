/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createProject } from '../fn/project-controller/create-project';
import { CreateProject$Params } from '../fn/project-controller/create-project';
import { getAllProjects } from '../fn/project-controller/get-all-projects';
import { GetAllProjects$Params } from '../fn/project-controller/get-all-projects';
import { Project } from '../models/project';
import { updateProject } from '../fn/project-controller/update-project';
import { UpdateProject$Params } from '../fn/project-controller/update-project';

@Injectable({ providedIn: 'root' })
export class ProjectControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateProject()` */
  static readonly UpdateProjectPath = '/api/projet/update/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateProject()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProject$Response(params: UpdateProject$Params, context?: HttpContext): Observable<StrictHttpResponse<Project>> {
    return updateProject(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateProject$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProject(params: UpdateProject$Params, context?: HttpContext): Observable<Project> {
    return this.updateProject$Response(params, context).pipe(
      map((r: StrictHttpResponse<Project>): Project => r.body)
    );
  }

  /** Path part for operation `createProject()` */
  static readonly CreateProjectPath = '/api/projet/create/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createProject()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createProject$Response(params: CreateProject$Params, context?: HttpContext): Observable<StrictHttpResponse<Project>> {
    return createProject(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createProject$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createProject(params: CreateProject$Params, context?: HttpContext): Observable<Project> {
    return this.createProject$Response(params, context).pipe(
      map((r: StrictHttpResponse<Project>): Project => r.body)
    );
  }

  /** Path part for operation `getAllProjects()` */
  static readonly GetAllProjectsPath = '/api/projet/odoo';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllProjects()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllProjects$Response(params?: GetAllProjects$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Project>>> {
    return getAllProjects(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllProjects$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllProjects(params?: GetAllProjects$Params, context?: HttpContext): Observable<Array<Project>> {
    return this.getAllProjects$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Project>>): Array<Project> => r.body)
    );
  }

}
