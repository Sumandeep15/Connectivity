import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storageservice';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'http://localhost:2069';//"http://8.38.88.31:85";//

  constructor(public http: HttpClient, private storage: StorageService) {
  }
  createAuthorizationHeader(headers: Headers) {
    let currentUser = this.storage.get("guser");

    //  headers.append('token', currentUser['token']);
    //  headers.append('Authorization', btoa(currentUser['user'].Email + ":" + currentUser['user'].Password));

    // let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });

    headers.append('token', btoa(JSON.stringify(currentUser['user'])));
    headers.append('Authorization', 'Bearer ' + currentUser['access_token']);
//alert(JSON.stringify(headers))
console.log(headers)
///Not Append
  }
  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams(),
        headers: new HttpHeaders()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }

    }
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    reqOpts.headers = headers;

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }
  postsignup(endpoint: string, body: any, reqOpts?: any) {

    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }
  post(endpoint: string, body: any, reqOpts?: any) {

    let headers = new Headers();
    this.createAuthorizationHeader(headers);
   // reqOpts.headers = headers;
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
  //  reqOpts.headers = headers;
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
   // reqOpts.headers = headers;
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }
}
