import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Warehouse } from '../interfaces/warehouse';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  getWarehouses(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>("https://localhost:5001/api/Warehouses")
  }

  getWarehouse(id: string): Observable<Warehouse> {
    const url = `https://localhost:5001/api/Warehouses/${id}`;
    return this.http.get<Warehouse>(url);
  }


  updateWarehouse(id: string, warehouse: Warehouse): Observable<any> {
    const url = `https://localhost:5001/api/Warehouses/${id}`;
    return this.http.put(url, warehouse, this.httpOptions);
  }


  addWarehouse(warehouse: Warehouse): Observable<Warehouse> {
    const url = 'https://localhost:5001/api/Warehouses'
    return this.http.post<Warehouse>(url, warehouse, this.httpOptions);
  }
}
