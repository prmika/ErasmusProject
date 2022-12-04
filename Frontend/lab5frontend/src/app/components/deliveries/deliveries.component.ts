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
    this.getDeliveries(); //Load deliveries data when user loads this page
  }

  deliveries: Delivery[] = []; //Deliveries will be stored here
  deliveriesSuccessfullyLoaded = true;
  getDeliveries(): void { //Will load all the delivery data via the deliveryservice
    this.deliveryService.getDeliveries().subscribe({
      next: (v) => {
        this.deliveries = v
        this.deliveries.sort((d1, d2) => { //Sort loaded delivery data
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
        console.error("Internal Server Error, the GET request for deliveries couldn't be processed. Try again later."); //Show error when deliveries can't get loaded.
        this.deliveriesSuccessfullyLoaded = false;
        setTimeout(() => window.location.reload(), 5000) //Reload page every 5 seconds
      },
    });
  }



}
