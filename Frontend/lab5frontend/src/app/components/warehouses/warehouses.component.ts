import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Warehouse } from 'src/app/interfaces/warehouse';
import { UserService } from 'src/app/services/user.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehousesComponent implements OnInit {
  role: string | undefined;
  notFoundHidden = true;
  constructor(private warehouseService: WarehouseService, public auth: AuthService, private user: UserService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => {
        this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
          if (isAuthenticated) {
            this.user.getUser(profile.email).subscribe({
              next: (data) => {
                this.role = data.role;
                if (this.role == "admin" || this.role == "warehouse_manager") {
                  this.getWarehouses(); //Load warehouse data when user loads this page
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

  warehouses: Warehouse[] = []; //Warehouses will be stored here
  warehousesSuccessfullyLoaded = true;
  getWarehouses(): void { //Will load all the warehouses data via the warehouseservice
    this.warehouseService.getWarehouses().subscribe({
      next: (v) => {
        this.warehouses = v
        this.warehouses.sort((w1, w2) => { //Sort loaded warehouse data
          if (w1.id > w2.id) {
            return 1;
          } else if (w1.id < w2.id) {
            return -1;
          } else {
            return 0;
          }
        })
      },
      error: (e) => {
        console.error("Internal Server Error, the GET request for warehouses couldn't be processed. Try again later."); //Show error when warehouses can't get loaded.
        this.warehousesSuccessfullyLoaded = false;
        setTimeout(() => window.location.reload(), 5000) //Reload page every 5 seconds
      },
    });
  }


}
