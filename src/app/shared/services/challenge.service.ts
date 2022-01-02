import { Challenge } from 'src/app/shared/models/challenge.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {
  private readonly baseUrl = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthenticationService
  ) {}

  add_team_challenge(_id: any, teamId: any) {
    return this.http.put(
      `${this.baseUrl}/add_team_challenge/${_id}/${teamId}`,
      { headers: new HttpHeaders({ authorization: this.auth.Token as any }) }
    );
  }
  remove_team_challenge(_id: any, teamId: any) {
    return this.http.put(
      `${this.baseUrl}/remove_team_challenge/${_id}/${teamId}`,
      { headers: new HttpHeaders({ authorization: this.auth.Token as any }) }
    );
  }
  findByName(name: any) {
    return this.http.get(`${this.baseUrl}/findByName/${name}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  getChallenges() {
    return this.http.get(`${this.baseUrl}/getChallenges`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  add_match_challenge(_id: any, matchId: any) {
    return this.http.put(
      `${this.baseUrl}/add_match_challenge/${_id}/${matchId}`,
      { headers: new HttpHeaders({ authorization: this.auth.Token as any }) }
    );
  }
  findChallengesByTeam(_id: any) {
    return this.http.get(`${this.baseUrl}/findChallengesByTeam/${_id}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  /*findChallengesByUser(_id: any) {
    return this.http.get(`${this.baseUrl}/findChallengesByUser/${_id}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }*/
  all_challenges() {
    return this.http.get(`${this.baseUrl}/all_challenges`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }

  add_challenge(challenge: Challenge) {
    return this.http.post(`${this.baseUrl}/add_challenge`, challenge, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  delete_challenge(_id: any) {
    return this.http.delete(`${this.baseUrl}/delete_challenge/${_id}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  update_challenge(_id: any, challenge: Challenge) {
    return this.http.put(`${this.baseUrl}/update_challenge/${_id}`, challenge, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  findByIdchallenge(_id: any) {
    return this.http.get(`${this.baseUrl}/findByIdchallenge/${_id}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
}
