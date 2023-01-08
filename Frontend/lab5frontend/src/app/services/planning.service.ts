import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Delivery } from '../interfaces/delivery';
import { Truck } from '../interfaces/truck';
import { DeliveryService } from './delivery.service';
import { TruckService } from './truck.service';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient, private deliveryService: DeliveryService, private truckService: TruckService) { }
  
}
