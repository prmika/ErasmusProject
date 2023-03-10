import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../interfaces/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  getRoles(): Observable<Role[]>{
    const url = 'http://localhost:3000/api/roles'
    return this.http.get<Role[]>(url, this.httpOptions);
  }

  addRole(role: Role): Observable<Role>{
    const url = 'http://localhost:3000/api/roles'
    return this.http.post<Role>(url, role, this.httpOptions);
  }

}
