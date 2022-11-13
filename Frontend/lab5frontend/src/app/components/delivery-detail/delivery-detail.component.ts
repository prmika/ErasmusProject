import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Delivery } from 'src/app/interfaces/delivery';
import { DeliveryService } from 'src/app/services/delivery.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-delivery-detail',
  templateUrl: './delivery-detail.component.html',
  styleUrls: ['./delivery-detail.component.css']
})
export class DeliveryDetailComponent implements OnInit {

  delivery: Delivery | undefined;
  successnotificationHidden = true;
  errornotificationHidden = true;
  warehouseIds: string[] = []
  min1WarehouseSuccessfullyLoaded = false;
  notAllFieldsHaveDataErrorHidden = true;

  deliveryDateFormatted: string = "";

  constructor(private route: ActivatedRoute,
    private deliveryService: DeliveryService,
    private warehouseService: WarehouseService) { }

  ngOnInit(): void {
    this.getDelivery();
    this.warehouseService.getWarehouses().subscribe({
      next: (v) => {
        v.forEach(warehouse => this.warehouseIds.push(warehouse.id));
        this.warehouseIds.sort();
        if (this.warehouseIds.length < 1) {
          this.min1WarehouseSuccessfullyLoaded = false;
        }
        else {
          this.min1WarehouseSuccessfullyLoaded = true;
        }
      },
      error: (e) => {
        console.error("Internal Server Error, the GET request for warehouses couldn't be processed, which means no deliveries can't be updated at the moment. Try again later.");
        this.min1WarehouseSuccessfullyLoaded = false;
      },
    })
  }

  getDelivery(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    console.log(id)
    this.deliveryService.getDelivery(id)
      .subscribe({
        next: (v) => {
          this.delivery = v
          this.deliveryDateFormatted = this.delivery.deliveryDate.split("T")[0];
        },
        error: (e) => {
          console.error("Internal Server Error, the GET request for delivery couldn't be processed. Try again later.");
          setTimeout(() => window.location.reload(), 5000)
        },
      });
  }

  updateDelivery(): void {
    if (this.delivery) {
      if ((this.delivery.warehouseID != undefined) &&
        (this.delivery.weight != undefined && this.delivery.weight > 0) &&
        (this.delivery.deliveryDate != undefined) &&
        (this.delivery.timeToPickup != undefined && this.delivery.timeToPickup > 0) &&
        (this.delivery.timeToPlace != undefined && this.delivery.timeToPlace > 0)) {

        this.delivery.deliveryDate = this.deliveryDateFormatted;
        this.deliveryService.updateDelivery(this.delivery.id, this.delivery).subscribe({
          next: (v) => {
            this.successnotificationHidden = false;
            console.log(v);
            setTimeout(() => {
              this.successnotificationHidden = true;
              window.location.href = 'deliveries';
            }, 4000)
          },
          error: (e) => {
            this.errornotificationHidden = false;
            console.error("Internal Server Error, the PUT request couldn't be processed. Try again later.");
            setTimeout(() => {
              this.errornotificationHidden = true;
            }, 4000)
          },
        })
      }
      else {
        setTimeout(() => this.notAllFieldsHaveDataErrorHidden = false, 5000);
      }
    }
  }

}
