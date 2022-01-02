import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Story } from '../models/story.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private readonly baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  all_storys() {
    return this.http.get(`${this.baseUrl}/all_storys`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  add_story(story: Story) {
    return this.http.post(`${this.baseUrl}/add_story`, story, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  delete_story(_id: any) {
    return this.http.delete(`${this.baseUrl}/delete_story/${_id}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  update_story(_id: any, story: Story) {
    return this.http.put(`${this.baseUrl}/update_story/${_id}`, story, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  findByIdstory(_id: any) {
    return this.http.get(`${this.baseUrl}/findByIdstory/${_id}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  findByCreatorstory(_id: any) {
    return this.http.get(`${this.baseUrl}/findByCreatorstory/${_id}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  like_story(_id: any, userId: any) {
    return this.http.put(`${this.baseUrl}/like_story/${_id}/${userId}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  dislike_story(_id: any, userId: any) {
    return this.http.put(`${this.baseUrl}/dislike_story/${_id}/${userId}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  view_story(_id: any, userId: any) {
    return this.http.put(`${this.baseUrl}/view_story/${_id}/${userId}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
}
