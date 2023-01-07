import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { WarehouseRoute } from 'src/app/interfaces/warehouse-route';
import { UserService } from 'src/app/services/user.service';
import { WarehouseRouteService } from 'src/app/services/warehouse-route.service';

@Component({
  selector: 'app-warehouse-routes',
  templateUrl: './warehouse-routes.component.html',
  styleUrls: ['./warehouse-routes.component.css']
})
export class WarehouseRoutesComponent implements OnInit {

  amountFilters = [1, 5, 10, 25];
  amountOfShowedItems = this.amountFilters[0];
  totalAmountOfPages = 0;
  currentPage = 0;
  previousPage = 0;
  nextPage = 0;
  
  role: string | undefined;
  notFoundHidden = true;
  constructor(private warehouseRouteService: WarehouseRouteService, public auth: AuthService, private user: UserService) { }

  ngOnInit(): void {
    if (this.auth.user$) {
      this.auth.user$.subscribe(
        (profile) => {
          this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
            if (isAuthenticated) {
              this.user.getUser(profile.email).subscribe({
                next: (data) => {
                  this.role = data.role;
                  if (this.role == "admin" || this.role == "logistics_manager") {
                    this.getWarehouseRoutes(); //Load warehouse routes data when user loads this page
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

  warehouseRoutes: WarehouseRoute[] = []; //Warehouses routes will be stored here
  warehouseRoutesSuccessfullyLoaded = true;
  getWarehouseRoutes(): void { //Will load all the warehouses routes data via the warehouseRoutesservice
    this.warehouseRouteService.getWarehousesRoutes().subscribe({
      next: (v) => {
        this.totalAmountOfPages = Math.ceil(v.length / this.amountOfShowedItems);
        this.currentPage = 1;
        this.nextPage = 2;
        if (this.totalAmountOfPages > 1) {
          this.warehouseRoutes = v.slice(0, this.amountOfShowedItems)
        }
        else {
          this.warehouseRoutes = v
        }
      },
      error: (e) => {
        console.error("Internal Server Error, the GET request for warehouses routes couldn't be processed. Try again later.");
        this.warehouseRoutesSuccessfullyLoaded = false;
        setTimeout(() => window.location.reload(), 5000) //Reload page every 5 seconds
      },
    });
  }

  goToNextPage(): void {
    if (this.nextPage <= this.totalAmountOfPages) {
      this.previousPage++;
      this.currentPage++;
      this.nextPage++;
      this.getDeliveryPathsPaged();
    }
  }

  goToPreviousPage(): void {
    if (this.previousPage > 0) {
      this.previousPage--;
      this.currentPage--;
      this.nextPage--;
      this.getDeliveryPathsPaged();
    }
  }

  updateAmountOfItems(): void {
    this.previousPage = 0;
    this.currentPage = 1;
    this.nextPage = 2;
    this.getDeliveryPathsPaged();
    this.totalAmountOfPages = Math.ceil(this.warehouseRoutes.length / this.amountOfShowedItems);
    
  }

  getDeliveryPathsPaged(): void {
    this.warehouseRouteService.getWarehousesRoutesPaged(this.currentPage, this.amountOfShowedItems).subscribe({
      next: (v) => {
        this.warehouseRoutes = v;
        this.warehouseRoutesSuccessfullyLoaded = true;
      },
      error: (e) => {
        console.error("Internal Server Error, the GET request for warehouseRoutes by page and item amount couldn't be processed. Try again later."); //Show error when warehouseRoutes can't get loaded.
        this.warehouseRoutesSuccessfullyLoaded = false;
        setTimeout(() => window.location.reload(), 5000) //Reload page every 5 seconds
      }
    });
  }
}
