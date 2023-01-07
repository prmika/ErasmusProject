import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Delivery } from 'src/app/interfaces/delivery';
import { DeliveryService } from 'src/app/services/delivery.service';
import { UserService } from 'src/app/services/user.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-deliveryadd',
  templateUrl: './deliveryadd.component.html',
  styleUrls: ['./deliveryadd.component.css']
})
export class DeliveryaddComponent implements OnInit {

  role: string | undefined;
  notFoundHidden = true;
  constructor(private warehouseService: WarehouseService, private deliveryService: DeliveryService, public auth: AuthService, private user: UserService) { }

  ngOnInit(): void {
    if (this.auth.user$) {
      this.auth.user$.subscribe(
        (profile) => {
          this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
            if (isAuthenticated) {
              this.user.getUser(profile.email).subscribe({
                next: (data) => {
                  this.role = data.role;
                  if (this.role == "admin" || this.role == "warehouse_manager") {
                    this.warehouseService.getWarehouses().subscribe({
                      next: (v) => {
                        v.forEach(warehouse => this.warehouseIds.push(warehouse.id)); //For each received warehouse the id will be pushed to the warehouseIds list.
                        this.warehouseIds.sort(); //WarehouseIds list will be sorted.
                        if (this.warehouseIds.length < 1) {
                          this.min1WarehouseSuccessfullyLoaded = false; //If less than one warehouse exists this variable should be false so that on the html page the form won't be visible to create a new delivery.
                        }
                        else {
                          this.warehouseID = this.warehouseIds[0]; //Default selected warehouseID is the first warehouse in the id list
                          this.min1WarehouseSuccessfullyLoaded = true; //Set to true so that the form is visible
                        }
                      },
                      error: (e) => {
                        console.error("Internal Server Error, the GET request for warehouses couldn't be processed, which means no routes can't be added at the moment. Try again later.");
                        this.min1WarehouseSuccessfullyLoaded = false; //When there's an error to load warehouses it shouldn't be possible to create a delivery.
                      },
                    })
                  }
                  else {
                    this.notFoundHidden = false;
                  }
                }
              });
            }
            else {
              this.notFoundHidden = false;
            }
          })
        });
    }
  }

  //All the delivery fields
  id: string | undefined;
  deliveryDate: string | undefined;
  timeToPickup: number | undefined;
  timeToPlace: number | undefined;
  warehouseID: string | undefined;
  weight: number | undefined;

  //All the message hidden status variables
  notAllFieldsHaveDataErrorHidden = true;
  deliveryWasSuccessfullyAddedHidden = true;
  deliveryWasNotAddedErrorHidden = true;
  
  warehouseIds: string[] = []
  min1WarehouseSuccessfullyLoaded = false;

  addDelivery(): void {
    if ((this.id != undefined && this.id.toUpperCase().startsWith("D")) && //Check that all the data is not undefined
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
      this.deliveryService.addDelivery(body as Delivery).subscribe({ //Use the deliveryservice to create a delivery.
        next: (v) => {
          this.deliveryWasSuccessfullyAddedHidden = false; //Show success message
          setTimeout(() => { window.location.href = 'deliveries'; this.deliveryWasSuccessfullyAddedHidden = true; }, 5000) //Will redirect to delivery listing page and hide success message after 5 seconds
        },
        error: (e) => {
          this.deliveryWasNotAddedErrorHidden = false; //Will show failure message
          console.error("Internal Server Error, the POST request for a new Delivery couldn't be processed. Try again later.");
          setTimeout(() => { this.deliveryWasNotAddedErrorHidden = true; }, 5000) //Will reset failure message after 5 seconds
        },
      })
    }
    else {
      this.notAllFieldsHaveDataErrorHidden = false; //Will show failure message because not all fields have data
      console.error("Not all necessary fields for a new Delivery were filled in. POST Request can only be executed when this is the case.");
      setTimeout(() => this.notAllFieldsHaveDataErrorHidden = true, 5000) //Will reset failure message because not all fields have data after 5 seconds
    }
  }

}
