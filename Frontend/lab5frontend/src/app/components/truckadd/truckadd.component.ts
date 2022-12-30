import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Truck } from 'src/app/interfaces/truck';
import { TruckService } from 'src/app/services/truck.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-truckadd',
  templateUrl: './truckadd.component.html',
  styleUrls: ['./truckadd.component.css']
})
export class TruckAddComponent implements OnInit {

  role: string | undefined;
  notFoundHidden = true;
  constructor(private truckService: TruckService, public auth: AuthService, private user: UserService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => {
        this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
          if (isAuthenticated) {
            this.user.getUser(profile.email).subscribe({
              next: (data) => {
                this.role = data.role;
                if (this.role != "admin" && this.role != "fleet_manager") {
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
  //Define all the fields necessary for a truck
  id: string | undefined;
  tare: number | undefined;
  load_capacity: number | undefined;
  max_battery_charge: number | undefined;
  autonomy: number | undefined;
  fast_charging_time: number | undefined;

  notAllFieldsHaveDataErrorHidden = true; //Shows error when not all data was given
  truckWasSuccessfullyAddedHidden = true; //Show success message when truck was successfully created
  truckWasNotAddedErrorHidden = true; //Show failure message when there were errors while trying to create the truck
  truckIdNotRightErrorHidden = true; //Show error message when the id is not right
  
  addTruck(): void { //Function to create a new truck
    if ((this.id != undefined && this.id.length == 6)) { //Id needs to have 6 characters.      
      if ((this.tare != undefined && this.tare >= 1) && //Will check if none of the fields are undefined and in the right format, if so the code will continue executing.
        (this.load_capacity != undefined && this.load_capacity >= 1) &&
        (this.max_battery_charge != undefined && this.max_battery_charge >= 1) &&
        (this.autonomy != undefined && this.autonomy >= 1) &&
        (this.fast_charging_time != undefined && this.fast_charging_time >= 1)) {
        let body = {
          "id": this.id.toUpperCase(),
          "tare": this.tare,
          "load_capacity": this.load_capacity,
          "max_battery_charge": this.max_battery_charge,
          "autonomy": this.autonomy,
          "fast_charging_time": this.fast_charging_time,
          "status": true
        }
        this.truckService.addTruck(body as Truck).subscribe({ //Will call the service to create the truck
          next: (v) => {
            this.truckWasSuccessfullyAddedHidden = false; //Show success message
            setTimeout(() => { window.location.href = 'trucks'; this.truckWasSuccessfullyAddedHidden = true; }, 5000) //Will redirect to truck listing page and hide success message after 5 seconds
          },
          error: (e) => {
            this.truckWasNotAddedErrorHidden = false; //Will show failure message
            console.error("Internal Server Error, the POST request for a new Truck couldn't be processed. Try again later.");
            setTimeout(() => { this.truckWasNotAddedErrorHidden = true; }, 5000) //Will reset failure message after 5 seconds
          },
        })
      }
      else {
        this.notAllFieldsHaveDataErrorHidden = false; //Will show failure message because not all fields have data
        console.error("Not all necessary fields for a new truck were filled in. POST Request can only be executed when this is the case.");
        setTimeout(() => this.notAllFieldsHaveDataErrorHidden = true, 5000) //Will reset failure message because not all fields have data after 5 seconds
      }
    }
    else {
      this.truckIdNotRightErrorHidden = false; //Will show failure message because id was not right (no data or not 6 characters)
      console.error("The license plate was not in the right format or wasn't 6 characters.");
      setTimeout(() => this.truckIdNotRightErrorHidden = true, 5000) //Will reset failure message because not all fields have data after 5 seconds
    }
  }


}
