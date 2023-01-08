import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { UserAdd } from '../interfaces/user-add';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  getUser(email: string): Observable<User> {
    const url = `http://localhost:3000/api/auth/user/${email}`;
    return this.http.get<User>(url);
  }

  getUsers(): Observable<User[]> {
    const url = `http://localhost:3000/api/auth`;
    return this.http.get<User[]>(url);
  }

  anonymizeUser(id: string): Observable<User[]> {
    const url = `http://localhost:3000/api/auth/anonymize/${id}`;
    return this.http.post<User[]>(url,null);
  }

  addUser(user: User): Observable<User> {
    const url = 'http://localhost:3000/api/auth/signup'
    return this.http.post<User>(url, user, this.httpOptions);
  }

  updateUser(email: string, user: User): Observable<UserAdd> {
    const url = `http://localhost:3000/api/auth/user/${email}`;
    let newUser: UserAdd = {firstName: user.firstName, lastName: user.lastName, email: user.email, password: user.password, phoneNr: user.phoneNr, role: user.role}
    return this.http.put<UserAdd>(url, newUser, this.httpOptions);
  }
}
