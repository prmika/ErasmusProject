import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Truck } from '../interfaces/truck';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  logUserIn(email: string, password: string): Observable<User>{
    const url = 'http://217.160.104.201:3000/api/auth/signin'
    return this.http.post<User>(url, {"email": email,"password": password}, this.httpOptions);
  }

  addUser(user: User): Observable<User> {
    const url = 'http://217.160.104.201:3000/api/auth/signup'
    return this.http.post<User>(url, user, this.httpOptions);
  }

  getCurrentUser(token: string): Observable<User> {
    const url = 'http://217.160.104.201:3000/api/users/me'
    const httpOptionsWithToken = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    };
    return this.http.get<User>(url, httpOptionsWithToken);
  }
}
