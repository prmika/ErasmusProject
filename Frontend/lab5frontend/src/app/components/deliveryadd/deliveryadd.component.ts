import { Component, OnInit } from '@angular/core';
import { Delivery } from 'src/app/interfaces/delivery';
import { DeliveryService } from 'src/app/services/delivery.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-deliveryadd',
  templateUrl: './deliveryadd.component.html',
  styleUrls: ['./deliveryadd.component.css']
})
export class DeliveryaddComponent implements OnInit {

  constructor(private warehouseService: WarehouseService, private deliveryService: DeliveryService) { }

  ngOnInit(): void {
    this.warehouseService.getWarehouses().subscribe({
      next: (v) => {
        v.forEach(warehouse => this.warehouseIds.push(warehouse.id));
        this.warehouseIds.sort();
        if(this.warehouseIds.length < 1){
          this.min1WarehouseSuccessfullyLoaded = false;
        }   
        else{
          this.warehouseID = this.warehouseIds[0];
          this.min1WarehouseSuccessfullyLoaded = true;
        }
      },
      error: (e) => {
        console.error("Internal Server Error, the GET request for warehouses couldn't be processed, which means no routes can't be added at the moment. Try again later.");
        this.min1WarehouseSuccessfullyLoaded = false;
      },
    })
  }

  id: string | undefined;
  deliveryDate: string | undefined;
  timeToPickup: number | undefined;
  timeToPlace: number | undefined;
  warehouseID: string | undefined;
  weight: number | undefined;

  notAllFieldsHaveDataErrorHidden = true;
  deliveryWasSuccessfullyAddedHidden = true;
  deliveryWasNotAddedErrorHidden = true;
  
  warehouseIds: string[] = []
  min1WarehouseSuccessfullyLoaded = false;

  addDelivery(): void {
    if ((this.id != undefined && this.id.toUpperCase().startsWith("D")) &&
      (this.warehouseID != undefined) &&
      (this.weight != undefined && this.weight > 0) &&
      (this.deliveryDate != undefined) &&
      (this.timeToPickup != undefined && this.timeToPickup > 0) &&
      (this.timeToPlace != undefined && this.timeToPlace > 0)) {
      let body = {
        "id": this.id.toUpperCase(),
        "deliveryDate": this.deliveryDate,
        "timeToPickup": this.timeToPickup,
        "timeToPlace": this.timeToPlace,
        "warehouseID": this.warehouseID,
        "weight": this.weight
      }
      this.deliveryService.addDelivery(body as Delivery).subscribe({
        next: (v) => {
          this.deliveryWasSuccessfullyAddedHidden = false;
          setTimeout(() => { window.location.href = 'deliveries'; this.deliveryWasSuccessfullyAddedHidden = true; }, 5000)
        },
        error: (e) => {
          this.deliveryWasNotAddedErrorHidden = false;
          console.error("Internal Server Error, the POST request for a new Delivery couldn't be processed. Try again later.");
          setTimeout(() => { this.deliveryWasNotAddedErrorHidden = true; }, 5000)
        },
      })
    }
    else {
      this.notAllFieldsHaveDataErrorHidden = false;
      console.error("Not all necessary fields for a new Delivery were filled in. POST Request can only be executed when this is the case.");
      setTimeout(() => this.notAllFieldsHaveDataErrorHidden = true, 5000)
    }
  }

}
