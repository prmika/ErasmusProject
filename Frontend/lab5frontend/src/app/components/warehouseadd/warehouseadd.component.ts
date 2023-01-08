import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Warehouse } from 'src/app/interfaces/warehouse';
import { UserService } from 'src/app/services/user.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-warehouseadd',
  templateUrl: './warehouseadd.component.html',
  styleUrls: ['./warehouseadd.component.css']
})
export class WarehouseAddComponent implements OnInit {

  role: string | undefined;
  notFoundHidden = true;
  constructor(private warehouseService: WarehouseService, public auth: AuthService, private user: UserService) { }

  ngOnInit(): void {
    if (this.auth.user$) {
      this.auth.user$.subscribe(
        (profile) => {
          this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
            if (isAuthenticated) {
              this.user.getUser(profile.email).subscribe({
                next: (data) => {
                  this.role = data.role;
                  if (this.role != "admin" && this.role != "warehouse_manager") {
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
  //Define all the fields necessary for a warehouse
  id: string | undefined;
  designation: string | undefined;
  address: string | undefined;
  latitude: number | undefined;
  longitude: number | undefined;
  altitude: number | undefined;

  notAllFieldsHaveDataErrorHidden = true; //Shows error when not all data was given
  warehouseWasSuccessfullyAddedHidden = true; //Show success message when warehouse was successfully created
  warehouseWasNotAddedErrorHidden = true; //Show failure message when there were errors while trying to create the warehouse

  addWarehouse(): void { //Function to create a new warehouse
    if ((this.id != undefined && this.id != "" && this.id.toUpperCase().includes("W")) && (this.designation != undefined && this.designation != "") && //Will check if none of the fields are undefined and in the right format, if so the code will continue executing
      (this.address != undefined && this.address != "") &&
      (this.latitude != undefined && this.latitude != 0) &&
      (this.longitude != undefined && this.longitude != 0)) {
      let body = {
        "id": this.id,
        "designation": this.designation,
        "address": this.address,
        "latitude": this.latitude,
        "longitude": this.longitude,
        "isActive": true,
        "altitude": 1
      }
      this.warehouseService.addWarehouse(body as Warehouse).subscribe({ //Will call the service to create the warehouse
        next: (v) => {
          this.warehouseWasSuccessfullyAddedHidden = false; //Show success message
          setTimeout(() => { window.location.href = 'warehouses'; this.warehouseWasSuccessfullyAddedHidden = true; }, 5000) //Will redirect to warehouse listing page and hide success message after 5 seconds
        },
        error: (e) => {
          this.warehouseWasNotAddedErrorHidden = false; //Will show failure message
          console.error("Internal Server Error, the POST request for a new Warehouse couldn't be processed. Try again later.");
          setTimeout(() => { this.warehouseWasNotAddedErrorHidden = true; }, 5000) //Will reset failure message after 5 seconds
        },
      })
    }
    else {
      this.notAllFieldsHaveDataErrorHidden = false; //Will show failure message because not all fields have data
      console.error("Not all necessary fields for a new warehouse were filled in. POST Request can only be executed when this is the case.");
      setTimeout(() => this.notAllFieldsHaveDataErrorHidden = true, 5000) //Will reset failure message because not all fields have data after 5 seconds
    }
  }
}
