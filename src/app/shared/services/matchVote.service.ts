import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatchVote } from '../models/matchVote.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class MatchVoteService {
  private readonly baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  findVoteByVoter(userId: any) {
    return this.http.get(`${this.baseUrl}/findVoteByVoter/${userId}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  all_matchVotes(userId: any) {
    return this.http.get(`${this.baseUrl}/all_matchVotes/${userId}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  add_matchVote(matchvote: MatchVote) {
    return this.http.post(`${this.baseUrl}/add_matchVote`, matchvote, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  delete_matchVote(_id: any) {
    return this.http.delete(`${this.baseUrl}/delete_matchVote/${_id}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  update_matchVote(_id: any, matchvote: MatchVote) {
    return this.http.put(`${this.baseUrl}/update_matchVote/${_id}`, matchvote, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  findByIdmatchVote(_id: any) {
    return this.http.get(`${this.baseUrl}/findByIdmatchVote/${_id}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
}
