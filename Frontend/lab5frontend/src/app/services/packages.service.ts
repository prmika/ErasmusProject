import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Packaging } from '../interfaces/package';
import { PackagingAdd } from '../interfaces/package-add';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  getPackages(): Observable<Packaging[]> {
    return this.http.get<Packaging[]>("http://217.160.104.201:3000/api/v1/packages")
  }

  getPackagesPaged(page: Number, amount: Number): Observable<Packaging[]> {
    return this.http.get<Packaging[]>(`http://217.160.104.201:3000/api/v1/packages/paged?page=${page}&amount=${amount}`)
  }

  getPackage(id: string): Observable<Packaging> {
    const url = `http://217.160.104.201:3000/api/v1/packages/${id}`;
    return this.http.get<Packaging>(url);
  }


  updatePackage(id: string, singlePackage: Packaging): Observable<any> {
    const url = `http://217.160.104.201:3000/api/v1/packages/${id}`;
    return this.http.put(url, singlePackage, this.httpOptions);
  }


  addPackage(singlePackage: PackagingAdd): Observable<Packaging> {
    const url = 'http://217.160.104.201:3000/api/v1/api/packages'
    return this.http.post<Packaging>(url, singlePackage, this.httpOptions);
  }
}
