import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Delivery } from 'src/app/interfaces/delivery';
import { DeliveryService } from 'src/app/services/delivery.service';
import { UserService } from 'src/app/services/user.service';
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
  notFoundHidden = true;

  deliveryDateFormatted: string = "";

  role: string | undefined;
  
  constructor(private route: ActivatedRoute, //We need this to read the current route url
    private deliveryService: DeliveryService, //Service to work with the data. This is in connection with the delivery backend and the database.
    private warehouseService: WarehouseService,
    public auth: AuthService, private user: UserService) { } //Service to work with the data. This is in connection with the warehouse backend and the database.

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
                    this.getDelivery();
                    this.warehouseService.getWarehouses().subscribe({
                      next: (v) => {
                        v.forEach(warehouse => this.warehouseIds.push(warehouse.id)); //For each reeceived warehouse the id will be pushed to the warehouseIds list.
                        this.warehouseIds.sort(); //WarehouseIds list will be sorted.
                        if (this.warehouseIds.length < 1) {
                          this.min1WarehouseSuccessfullyLoaded = false; //If less than one warehouse exists this variable should be false so that on the html page the form won't be visible to create a new delivery.
                        }
                        else {
                          this.min1WarehouseSuccessfullyLoaded = true; //Set to true so that the form is visible
                        }
                      },
                      error: (e) => {
                        console.error("Internal Server Error, the GET request for warehouses couldn't be processed, which means no deliveries can't be updated at the moment. Try again later.");
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

  getDelivery(): void {
    const id = String(this.route.snapshot.paramMap.get('id')); //Reads the delivery id parameter at the end of the route url
    this.deliveryService.getDelivery(id) //Uses deliveryservice to get the delivery data associated with the entered id.
      .subscribe({
        next: (v) => {
          this.delivery = v
          this.deliveryDateFormatted = this.delivery.deliveryDate.split("T")[0]; //Format the received data in a format that the frontend understands (by removing the time part)
        },
        error: (e) => {
          console.error("Internal Server Error, the GET request for delivery couldn't be processed. Try again later.");
          setTimeout(() => window.location.reload(), 5000)
        },
      });
  }

  updateDelivery(): void {
    if (this.delivery) {
      if ((this.delivery.warehouseID != undefined) && //Checks if all the necessary data is present 
        (this.delivery.weight != undefined && this.delivery.weight > 0) &&
        (this.delivery.deliveryDate != undefined) &&
        (this.delivery.timeToPickup != undefined && this.delivery.timeToPickup > 0) &&
        (this.delivery.timeToPlace != undefined && this.delivery.timeToPlace > 0)) {

        this.delivery.deliveryDate = this.deliveryDateFormatted;
        this.deliveryService.updateDelivery(this.delivery.id, this.delivery).subscribe({ //Uses deliveryservice to update the delivery based on the data the delivery variable has (this might have been changed by the user in the template thanks to the ngModel)
          next: (v) => {
            this.successnotificationHidden = false; //Show success message
            console.log(v);
            setTimeout(() => {
              this.successnotificationHidden = true;
              window.location.href = 'deliveries';
            }, 4000) //Will redirect to delivery listing page and hide success message after 4 seconds
          },
          error: (e) => {
            this.errornotificationHidden = false; //Will show failure message
            console.error("Internal Server Error, the PUT request couldn't be processed. Try again later.");
            setTimeout(() => {
              this.errornotificationHidden = true;
            }, 4000) //Will reset failure message after 4 seconds
          },
        })
      }
      else {
        setTimeout(() => this.notAllFieldsHaveDataErrorHidden = false, 5000);
      }
    }
  }

}
