import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Truck } from '../interfaces/truck';

@Injectable({
  providedIn: 'root'
})
export class TruckService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  getTrucks(): Observable<Truck[]> {
    return this.http.get<Truck[]>("http://localhost:3000/api/v1/trucks")
  }

  getTruck(id: string): Observable<Truck> {
    const url = `http://localhost:3000/api/v1/trucks/${id}`;
    return this.http.get<Truck>(url);
  }


  updateTruck(id: string, truck: Truck): Observable<any> {
    const url = `http://localhost:3000/api/v1/trucks/${id}`;
    return this.http.put(url, truck, this.httpOptions);
  }


  addTruck(truck: Truck): Observable<Truck> {
    const url = 'http://localhost:3000/api/v1/trucks'
    return this.http.post<Truck>(url, truck, this.httpOptions);
  }
  //  // URL to web api

  //   /** DELETE: delete the truck from the server */
  //   deleteTruck(id: number): Observable<Truck> {
  //     const url = `${this.truckesUrl}/${id}`;

  //     return this.http.delete<Truck>(url, this.httpOptions);
  //   }
}
