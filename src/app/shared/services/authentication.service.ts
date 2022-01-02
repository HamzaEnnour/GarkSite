import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import {
  IPayload,
  ICredentails,
  IRegisterCredentails,
  User,
} from '../models/user.model';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly baseUrl = `${environment.apiUrl}`;


  constructor(private http: HttpClient, private router: Router) {}

  public logIn(credentials: ICredentails) {
    // auth/signin
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }
  public register(credentials: any) {
    // auth/signin
    return this.http.post(`${this.baseUrl}/register`, credentials);
  }
  public verifyMail(_id: any) {
    return this.http.get(`${this.baseUrl}/verifyMail/${_id}`);
  }
  public userData() {
    return this.http.get(`${this.baseUrl}/userData`, {
      headers: new HttpHeaders({ "authorization": this.Token as any }),
    });
  }
  public getUser(email: any) {
    return this.http.get(`${this.baseUrl}/getUser/${email}`, {
      headers: new HttpHeaders({ "authorization": this.Token as any }),
    });
  }
  public findByIduser(_id: any) {
    return this.http.get(`${this.baseUrl}/findByIduser/${_id}`, {
      headers: new HttpHeaders({ "authorization": this.Token as any }),
    });
  }
  public passwordRecovery(reqBody: any) {
    return this.http.post(`${this.baseUrl}/passwordRecovery`, reqBody);
  }
  public passwordReset(reqBody: any) {
    return this.http.put(`${this.baseUrl}/passwordReset`, reqBody);
  }
  public updateUserEmail(reqBody: any) {
    return this.http.put(`${this.baseUrl}/updateUserEmail`, reqBody, {
      headers: new HttpHeaders({ "authorization": this.Token as any }),
    });
  }
  public updatecompletedInformation(reqBody: any) {
    return this.http.put(`${this.baseUrl}/updatecompletedInformation`, reqBody, {
      headers: new HttpHeaders({ "authorization": this.Token as any }),
    });
  }
  public updateUser(reqBody: any) {
    return this.http.put(`${this.baseUrl}/updateUser`, reqBody, {
      headers: new HttpHeaders({ "authorization": this.Token as any }),
    });
  }
  public LoginWithFacebook(reqBody: any) {
    return this.http.post(`${this.baseUrl}/LoginWithFacebook`, reqBody, {
      headers: new HttpHeaders({ "authorization": this.Token as any }),
    });
  }
  //////////////// ADDITION ////////////////////////////
  public passwordRecoveryWebEJS(reqBody: any) {
    return this.http.post(`${this.baseUrl}/passwordRecoveryWebEJS`, reqBody);
  }
  public verifyreset(reqBody: any) {
    return this.http.post(`${this.baseUrl}/verify-reset`, reqBody);
  }

  //////////////////////////////////////////GET ressources///////////////////////////////////////
  //Player
  public getAllPlayers(country : any , limit : any, like : any) {
    return this.http.get(`${this.baseUrl}/getAllPlayers/${country}/${limit}/${like}`, {
      headers: new HttpHeaders({ "authorization": this.Token as any }),
    });
  }
  //Club
  public getAllClubs(country : any, limit : any,like :any) {
    return this.http.get(`${this.baseUrl}/getAllClubs/${country}/${limit}/${like}`, {
      headers: new HttpHeaders({ "authorization": this.Token as any }),
    });
  }
  public getAllCountries(limit :any , like : any) {
    return this.http.get(`${this.baseUrl}/getAllCountries/${limit}/${like}`, {
      headers: new HttpHeaders({ "authorization": this.Token as any }),
    });
  }

  public assignNotificationToken(token: string) {
    return this.http.put(
      `${this.baseUrl}/assign-notif`,
      { token },
      { headers: new HttpHeaders({ "authorization": this.Token as any }) }
    );
  }

  public getNotificationToken() {
    return this.http.get(`${this.baseUrl}/get-notif`, {
      headers: new HttpHeaders({ "authorization": this.Token as any }),
    });
  }

  public rememberMe(email: string, password: string) {}

  public signOut() {
    localStorage.removeItem(`${environment.login}`);
    this.router.navigateByUrl('/');
  }

  public saveToken(token: string) {
    console.log(jwt_decode(token));
    localStorage.setItem(`${environment.login}`, token);
  }

  get Token() {
    return localStorage.getItem(`${environment.login}`);
  }


  get isAuthenticated(): boolean {
    return this.Payload ? true : false;
  }

  get Payload(): IPayload {
    const token = this.Token;
    if (token) {
      
      return jwt_decode(token);
    }
    return null as any;
  }
}
