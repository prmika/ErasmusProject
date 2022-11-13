import { Component, OnInit } from '@angular/core';
import { Delivery } from 'src/app/interfaces/delivery';
import { DeliveryService } from 'src/app/services/delivery.service';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit {

  constructor(private deliveryService: DeliveryService) { }

  ngOnInit(): void {
    this.getDeliveries();
  }

  deliveries: Delivery[] = [];
  deliveriesSuccessfullyLoaded = true;
  getDeliveries(): void {
    this.deliveryService.getDeliveries().subscribe({
      next: (v) => {
        this.deliveries = v
        this.deliveries.sort((d1, d2) => {
          if(d1.id > d2.id) {
            return 1;
          } else if(d1.id < d2.id) {
            return -1;
          } else {
            return 0;
          }
        })
      },
      error: (e) => {
        console.error("Internal Server Error, the GET request for deliveries couldn't be processed. Try again later.");
        this.deliveriesSuccessfullyLoaded = false;
        setTimeout(() => window.location.reload(), 5000)
      },
    });
  }



}
