import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Delivery } from 'src/app/interfaces/delivery';
import { DeliveryService } from 'src/app/services/delivery.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit {

  sortfilters = ["id", "warehouseId", "deliveryDate", "timeToPickup", "timeToPlace", "weight"];
  chosenSorting = this.sortfilters[0];

  filters = ["warehouseId", "deliveryDate", "timeToPickup", "timeToPlace", "weight"];
  chosenFilter = this.filters[0];
  stringFilterValue: string | undefined;
  numericFilterValue: Number | undefined;

  amountFilters = [1, 5, 10, 25];
  amountOfShowedItems = this.amountFilters[0];
  totalAmountOfPages = 0;
  currentPage = 0;
  previousPage = 0;
  nextPage = 0;
  notFoundHidden = true;

  role: string | undefined;

  constructor(private deliveryService: DeliveryService, public auth: AuthService, private user: UserService) { }

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
                    this.getDeliveries(); //Load deliveries data when user loads this page
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

  deliveries: Delivery[] = []; //Deliveries will be stored here
  deliveriesSuccessfullyLoaded = true;

  getDeliveries(): void { //Will load all the delivery data via the deliveryservice
    this.deliveryService.getDeliveries().subscribe({
      next: (v) => {
        this.totalAmountOfPages = Math.ceil(v.length / this.amountOfShowedItems);
        this.currentPage = 1;
        this.nextPage = 2;
        if (this.totalAmountOfPages > 1) {
          this.deliveries = v.slice(0, this.amountOfShowedItems)
        }
        else {
          this.deliveries = v
        }
        this.deliveries.sort((d1, d2) => { //Sort loaded delivery data
          if (d1.id > d2.id) {
            return 1;
          } else if (d1.id < d2.id) {
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

  goToNextPage(): void {
    if (this.nextPage <= this.totalAmountOfPages) {
      this.previousPage++;
      this.currentPage++;
      this.nextPage++;
      this.getDeliveriesPaged();
    }
  }

  goToPreviousPage(): void {
    if (this.previousPage > 0) {
      this.previousPage--;
      this.currentPage--;
      this.nextPage--;
      this.getDeliveriesPaged();
    }
  }

  updateAmountOfItems(): void {
    this.previousPage = 0;
    this.currentPage = 1;
    this.nextPage = 2;
    this.getDeliveriesPaged();
    this.totalAmountOfPages = Math.ceil(this.deliveries.length / this.amountOfShowedItems);
    
  }

  getDeliveriesPaged(): void {
    this.deliveryService.getDeliveriesPaged(this.currentPage, this.amountOfShowedItems).subscribe({
      next: (v) => {
        this.deliveries = v;
        this.deliveriesSuccessfullyLoaded = true;
      },
      error: (e) => {
        console.error("Internal Server Error, the GET request for deliveries by page and item amount couldn't be processed. Try again later."); //Show error when deliveries can't get loaded.
        this.deliveriesSuccessfullyLoaded = false;
        setTimeout(() => window.location.reload(), 5000) //Reload page every 5 seconds
      }
    });
  }

  filterData(): void {
    if (this.chosenFilter == "warehouseId" || this.chosenFilter == "deliveryDate") {
      if (this.stringFilterValue != undefined && this.stringFilterValue != "") {
        this.deliveryService.getDeliveries().subscribe({
          next: (v) => {
            if (this.chosenFilter == "warehouseId") {
              this.deliveries = v.filter(del => del.warehouseID == this.stringFilterValue);
            }
            else {
              console.log(this.stringFilterValue)
              this.deliveries = v.filter(del => del.deliveryDate.split("T")[0] == this.stringFilterValue);
            }
          },
          error: (e) => {
            console.error("Internal Server Error while trying to filter the data. Try again later.");
          },
        });
      }
      else {
        this.getDeliveries();
      }
    }
    else {
      if (this.numericFilterValue != undefined) {
        this.deliveryService.getDeliveries().subscribe({
          next: (v) => {
            if (this.chosenFilter == "timeToPickup") {
              this.deliveries = v.filter(del => del.timeToPickup == this.numericFilterValue);
            }
            else if (this.chosenFilter == "timeToPlace") {
              this.deliveries = v.filter(del => del.timeToPlace == this.numericFilterValue);
            }
            else {
              this.deliveries = v.filter(del => del.weight == this.numericFilterValue);
            }
          },
          error: (e) => {
            console.error("Internal Server Error while trying to filter the data. Try again later.");
          },
        });
      }
      else {
        this.getDeliveries();
      }
    }
  }

  sortData(): void {
    this.deliveries = this.deliveries.sort((d1, d2) => { //Sort loaded delivery data
      if (this.chosenSorting == "id") {
        if (d1.id > d2.id) {
          return 1;
        } else if (d1.id < d2.id) {
          return -1;
        } else {
          return 0;
        }
      }
      else if (this.chosenSorting == "warehouseId") {
        if (d1.warehouseID > d2.warehouseID) {
          return 1;
        } else if (d1.warehouseID < d2.warehouseID) {
          return -1;
        } else {
          return 0;
        }
      }
      else if (this.chosenSorting == "deliveryDate") {
        if (d1.deliveryDate > d2.deliveryDate) {
          return 1;
        } else if (d1.deliveryDate < d2.deliveryDate) {
          return -1;
        } else {
          return 0;
        }
      }
      else if (this.chosenSorting == "timeToPickup") {
        if (d1.timeToPickup > d2.timeToPickup) {
          return 1;
        } else if (d1.timeToPickup < d2.timeToPickup) {
          return -1;
        } else {
          return 0;
        }
      }
      else if (this.chosenSorting == "timeToPlace") {
        if (d1.timeToPlace > d2.timeToPlace) {
          return 1;
        } else if (d1.timeToPlace < d2.timeToPlace) {
          return -1;
        } else {
          return 0;
        }
      }
      else {
        if (d1.weight > d2.weight) {
          return 1;
        } else if (d1.weight < d2.weight) {
          return -1;
        } else {
          return 0;
        }
      }
    });
  }


}
