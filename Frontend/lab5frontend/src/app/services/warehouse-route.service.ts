import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WarehouseRoute } from '../interfaces/warehouse-route';
import { WarehouseRouteAdd } from '../interfaces/warehouse-route-add';

@Injectable({
  providedIn: 'root'
})
export class WarehouseRouteService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  getWarehousesRoutes(): Observable<WarehouseRoute[]> {
    return this.http.get<WarehouseRoute[]>("http://localhost:3000/api/v1/deliverypath")
  }

  getWarehouseRoute(id: string): Observable<WarehouseRoute> {
    const url = `http://localhost:3000/api/v1/deliverypath/${id}`;
    return this.http.get<WarehouseRoute>(url);
  }


  updateWarehouseRoute(id: string, warehouseRoute: WarehouseRoute): Observable<any> {
    const url = `http://localhost:3000/api/v1/deliverypath/${id}`;
    return this.http.put(url, warehouseRoute, this.httpOptions);
  }


  addWarehouseRoute(warehouseRoute: WarehouseRouteAdd): Observable<WarehouseRoute> {
    const url = 'http://localhost:3000/api/v1/deliverypath'
    return this.http.post<WarehouseRoute>(url, warehouseRoute, this.httpOptions);
  }
}
