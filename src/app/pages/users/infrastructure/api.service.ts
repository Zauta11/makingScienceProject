import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserFriends } from 'src/app/core/util/interfaces';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private readonly http: HttpClient) { }

  private URL = "http://localhost:3000/posts"

  getUsers(page: number, perPage: number): Observable<User[]> {
    const start: number = (page - 1) * perPage;
    const end: number = start + perPage;
    return this.http.get<User[]>(`${this.URL}?_start=${start}&_end=${end}`)
  }

  getUserDetails(id: number): Observable<User> {
    return this.http.get<User>(`${this.URL}/${id}`)
  }

  getUserFriends(page: number, perPage: number, id: number): Observable<UserFriends[]> {
    const start: number = (page - 1) * perPage;
    const end: number = start + perPage;
    return this.http.get<UserFriends[]>(`${this.URL}/${id}/comments?_start=${start}&_end=${end}`)
  }
  
}
