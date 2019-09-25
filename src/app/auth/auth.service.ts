import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { map } from 'rxjs/operators';
import * as crypto from "crypto";
import { environment } from '../../environments/environment';

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private username: string;

  private data: Object;

  constructor(
    private http: HttpClient, 
    private router: Router,
    ) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserName() {
    return this.username;
  }

  addUser(username: string, password: string) {
    const c_password = crypto.createHash('sha256').update(password).digest('base64');
    const authData: AuthData = { username: username, password: password };
    const postData = {
      "jsonrpc": "2.0",
      "method": "addUser",
      "params": {
        "name": authData.username,
        "encPassword": c_password
      },
      "id": 1
    }
    return this.http
      .post(`${environment.apiUrl}`, postData)
  }

  login(username: string, password: string) {
    console.log(username);
    console.log(password)
    const c_password = crypto.createHash('sha256').update(password).digest('base64');
    const authData: AuthData = { username: username, password: password };
    const postData = {
      "jsonrpc": "2.0",
      "method": "login",
      "params": {
        "name": authData.username,
        "encPassword": c_password
      },
      "id": 2
    }
    return this.http
      .post(`${environment.apiUrl}`, postData)
      .pipe(map(response=> {
        var result = response['result'];
        if (result){
          let token = result['token'];
          this.token = token;
          this.isAuthenticated = true;
          this.username = username;
          this.saveAuthData(token, this.username);
        }else{
          this.isAuthenticated = false;
        }
        return response
      }));      
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }    

    this.token = authInformation.token;
    this.isAuthenticated = true;
    this.username = authInformation.username;
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;

    this.clearAuthData();
    this.router.navigate(["/login"]);
  }


  private saveAuthData(token: string, username: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  }

  clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.isAuthenticated = false;
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (!token) {
      return;
    }
    return {
      token: token,
      username: username
    }
  }

  getFormData() {
    return this.data;
  }

  saveFormData(data){
    this.data = data;
    // console.log(data);
  }
}
