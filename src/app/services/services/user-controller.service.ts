/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { uploadUserImage } from '../fn/user-controller/upload-user-image';
import { UploadUserImage$Params } from '../fn/user-controller/upload-user-image';

@Injectable({ providedIn: 'root' })
export class UserControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `uploadUserImage()` */
  static readonly UploadUserImagePath = '/user/upload';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadUserImage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadUserImage$Response(params?: UploadUserImage$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadUserImage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadUserImage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadUserImage(params?: UploadUserImage$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadUserImage$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

}
