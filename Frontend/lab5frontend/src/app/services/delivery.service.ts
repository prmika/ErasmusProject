import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Delivery } from '../interfaces/delivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  getDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>("https://localhost:5001/api/Deliveries")
  }

  getDeliveriesPaged(page: Number, amount: Number): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(`https://localhost:5001/api/Deliveries/paged?page=${page}&amount=${amount}`)
  }

  getDelivery(id: string): Observable<Delivery> {
    const url = `https://localhost:5001/api/Deliveries/${id}`;
    return this.http.get<Delivery>(url);
  }


  updateDelivery(id: string, delivery: Delivery): Observable<any> {
    const url = `https://localhost:5001/api/Deliveries/${id}`;
    return this.http.put(url, delivery, this.httpOptions);
  }


  addDelivery(delivery: Delivery): Observable<Delivery> {
    const url = 'https://localhost:5001/api/Deliveries'
    return this.http.post<Delivery>(url, delivery, this.httpOptions);
  }
}
