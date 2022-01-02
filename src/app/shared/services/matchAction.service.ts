import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { MatchAction } from '../models/matchAction.model';

@Injectable({
  providedIn: 'root',
})
export class MatchActionService {
  private readonly baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  groupByTeam(teamId: any) {
    return this.http.get(`${this.baseUrl}/groupByTeam/${teamId}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  groupByPlayer(playerId: any) {
    return this.http.get(`${this.baseUrl}/groupByPlayer/${playerId}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  groupByChallenge(challengeId: any) {
    return this.http.get(`${this.baseUrl}/groupByChallenge/${challengeId}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  groupByMatch(matchid: any) {
    return this.http.get(`${this.baseUrl}/groupByMatch/${matchid}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  add_matchAction(matchaction: MatchAction) {
    return this.http.post(`${this.baseUrl}/add_matchAction`, matchaction, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  update_matchAction(matchaction: MatchAction, _id: any) {
    return this.http.put(
      `${this.baseUrl}/update_matchAction/${_id}`,
      matchaction,
      {
        headers: new HttpHeaders({ authorization: this.auth.Token as any }),
      }
    );
  }
  delete_matchAction(_id: any) {
    return this.http.delete(`${this.baseUrl}/delete_matchAction/${_id}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  findByIdmatchAction(_id: any) {
    return this.http.get(`${this.baseUrl}/findByIdmatchAction/${_id}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
}
