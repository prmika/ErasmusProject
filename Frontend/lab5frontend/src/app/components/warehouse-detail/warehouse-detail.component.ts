import { Component, OnInit } from '@angular/core';
import { Warehouse } from 'src/app/interfaces/warehouse';
import { ActivatedRoute } from '@angular/router';
import { WarehouseService } from 'src/app/services/warehouse.service';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-warehouse-detail',
  templateUrl: './warehouse-detail.component.html',
  styleUrls: ['./warehouse-detail.component.css']
})
export class WarehouseDetailComponent implements OnInit {

  warehouse: Warehouse | undefined; //Stores warehouse data
  successnotificationHidden = true; //Stores value to hide message (should be showed when warehouse is successfully updated)
  errornotificationHidden = true; //Stores value to hide message (should be showed when warehouse had errors while updating)

  role: string | undefined;
  notFoundHidden = true;

  constructor(
    private route: ActivatedRoute, //We need this to read the current route url
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
                if (this.role == "admin" || this.role == "warehouse_manager") {
                  this.getWarehouse(); //Load the detailed warehouse data when loading this page
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

  getWarehouse(): void {
    const id = String(this.route.snapshot.paramMap.get('id')); //Reads the warehouse id parameter at the end of the route url
    this.warehouseService.getWarehouse(id) //Uses warehouseservice to get the warehouse data associated with the entered id.
      .subscribe({
        next: (v) => {
          this.warehouse = v
        },
        error: (e) => {
          console.error("Internal Server Error, the GET request for warehouse couldn't be processed. Try again later.");
          setTimeout(() => window.location.reload(), 5000)
        },
      }); 
  }

  updateWarehouse(): void {
    if (this.warehouse) { //Warehouse can't be undefined
      this.warehouseService.updateWarehouse(this.warehouse.id, this.warehouse).subscribe({ //Uses warehouseservice to update the warehouse based on the data the warehouse parameter has (this might have been changed by the user in the template thanks to the ngModel)
        next: (v) => {
          this.successnotificationHidden = false; //Show success message
          console.log(v);
          setTimeout(() => {
            this.successnotificationHidden = true;
            window.location.href = 'warehouses';
          }, 4000) //Will redirect to warehouse listing page and hide success message after 4 seconds
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
  }

}
