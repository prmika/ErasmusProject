import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { WarehouseRoute } from 'src/app/interfaces/warehouse-route';
import { UserService } from 'src/app/services/user.service';
import { WarehouseRouteService } from 'src/app/services/warehouse-route.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-warehouse-routes-detail',
  templateUrl: './warehouse-routes-detail.component.html',
  styleUrls: ['./warehouse-routes-detail.component.css']
})
export class WarehouseRoutesDetailComponent implements OnInit {

  warehouseRoute: WarehouseRoute | undefined; //Stores warehouse route data
  successnotificationHidden = true; //Stores value to hide message (should be showed when warehouse route is successfully updated)
  errornotificationHidden = true; //Stores value to hide message (should be showed when warehouse route had errors while updating)
  warehouseIds: string[] = [] //Stores the warehouseIds
  min2WarehouseSuccessfullyLoaded = false; //Stores value to hide sections, should be true when 2 warehouses where successfully loaded
  notAllFieldsHaveDataErrorHidden = true; //Stores value to show notification when not all fields have data

  role: string | undefined;
  notFoundHidden = true;
  constructor(
    private route: ActivatedRoute, //We need this to read the current route url
    private warehouseRouteService: WarehouseRouteService, //Service to work with the data. This is in connection with the warehouse route backend and the database.
    private warehouseService: WarehouseService, //Service to work with the data. This is in connection with the warehouse backend and the database.
    public auth: AuthService, private user: UserService
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => {
        this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
          if (isAuthenticated) {
            this.user.getUser(profile.email).subscribe({
              next: (data) => {
                this.role = data.role;
                if (this.role == "admin" || this.role == "logistics_manager") {
                  this.getWarehouseRoute(); //Load the detailed warehouse route data when loading this page
                  this.warehouseService.getWarehouses().subscribe({ //Load the warehousesIds
                    next: (v) => {
                      v.forEach(warehouse => this.warehouseIds.push(warehouse.id)); //For each warehouse push the id to the id list
                      this.warehouseIds.sort();
                      if (this.warehouseIds.length < 2) {
                        this.min2WarehouseSuccessfullyLoaded = false; //set value to false if less than 2 warehouses were loaded
                      }
                      else {
                        this.min2WarehouseSuccessfullyLoaded = true; //set value to true if more than 2 warehouses were loaded
                      }
                    },
                    error: (e) => {
                      console.error("Internal Server Error, the GET request for warehouses couldn't be processed, which means no routes can't be updated at the moment. Try again later.");
                      this.min2WarehouseSuccessfullyLoaded = false; //set value to false because of loading error
                    },
                  })
                }
                else{
                  this.notFoundHidden = false;
                }
              }
            });
          }
          else{
            this.notFoundHidden = false;
          }
        })
      });
  }

  getWarehouseRoute(): void {
    const id = String(this.route.snapshot.paramMap.get('id')); //Reads the warehouse route id parameter at the end of the route url
    this.warehouseRouteService.getWarehouseRoute(id) //Uses warehouseRouteservice to get the warehouse route data associated with the entered id.
      .subscribe({
        next: (v) => {
          this.warehouseRoute = v
        },
        error: (e) => {
          console.error("Internal Server Error, the GET request for warehouse route couldn't be processed. Try again later.");
          setTimeout(() => window.location.reload(), 5000)
        },
      });
  }

  updateWarehouseRoute(): void {
    if (this.warehouseRoute) { //Warehouse route can't be undefined
      if ((this.warehouseRoute.departure_warehouseId != this.warehouseRoute.destination_warehouseId) && //Check that all the data is not undefined
        (this.warehouseRoute.distance != undefined && this.warehouseRoute.distance > 0) &&
        (this.warehouseRoute.time != undefined && this.warehouseRoute.time > 0) &&
        (this.warehouseRoute.used_battery != undefined && this.warehouseRoute.used_battery > 0) &&
        (this.warehouseRoute.extra_time_when_charging_required != undefined && this.warehouseRoute.extra_time_when_charging_required > 0)) {
        this.warehouseRouteService.updateWarehouseRoute(this.warehouseRoute.id, this.warehouseRoute).subscribe({ //Use the warehouseRouteservice to update a route and subscribe to the result.
          next: (v) => {
            this.successnotificationHidden = false; //Show success message
            setTimeout(() => {
              this.successnotificationHidden = true;
              window.location.href = 'warehouse-routes';
            }, 4000) //Will redirect to delivery listing page and hide success message after 4 seconds
          },
          error: (e) => {
            this.errornotificationHidden = false; //Will show failure message
            console.error("Internal Server Error, the PUT request couldn't be processed. Try again later.");
            setTimeout(() => {
              this.errornotificationHidden = true;
            }, 4000) //Will reset failure message after 5 seconds
          },
        })
      }
      else {
        this.notAllFieldsHaveDataErrorHidden = false;
        setTimeout(() => this.notAllFieldsHaveDataErrorHidden = true, 5000);
      }
    }
  }
}
