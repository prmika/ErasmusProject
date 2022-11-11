import { Component, OnInit } from '@angular/core';
import { Truck } from 'src/app/interfaces/truck';
import { TruckService } from 'src/app/services/truck.service';

@Component({
  selector: 'app-truckadd',
  templateUrl: './truckadd.component.html',
  styleUrls: ['./truckadd.component.css']
})
export class TruckAddComponent implements OnInit {

  constructor(private truckService: TruckService) { }

  ngOnInit(): void {
  }

  tare: number | undefined;
  load_capacity: number | undefined;
  max_battery_charge: number | undefined;
  autonomy: number | undefined;
  fast_charging_time: number | undefined;

  notAllFieldsHaveDataErrorHidden = true;
  truckWasSuccessfullyAddedHidden = true;
  truckWasNotAddedErrorHidden = true;

  addTruck(): void {
    if ((this.tare != undefined && this.tare >= 1) &&
      (this.load_capacity != undefined && this.load_capacity >= 1) &&
      (this.max_battery_charge != undefined && this.max_battery_charge >= 1) &&
      (this.autonomy != undefined && this.autonomy >= 1) &&
      (this.fast_charging_time != undefined && this.fast_charging_time >= 1)) {
      let body = {
        "tare": this.tare,
        "load_capacity": this.load_capacity,
        "max_battery_charge": this.max_battery_charge,
        "autonomy": this.autonomy,
        "fast_charging_time": this.fast_charging_time
      }
      this.truckService.addTruck(body as Truck).subscribe({
        next: (v) => {
          this.truckWasSuccessfullyAddedHidden = false;
          setTimeout(() => {window.location.href = 'trucks';; this.truckWasSuccessfullyAddedHidden = true;}, 5000)      
        },
        error: (e) => {
          this.truckWasNotAddedErrorHidden = false;
          console.error("Internal Server Error, the POST request for a new Truck couldn't be processed. Try again later.");
          setTimeout(() => {this.truckWasNotAddedErrorHidden = true;}, 5000)    
        },
      })
    }
    else{
      this.notAllFieldsHaveDataErrorHidden = false;
      console.error("Not all necessary fields for a new truck were filled in. POST Request can only be executed when this is the case.");
      setTimeout(() => this.notAllFieldsHaveDataErrorHidden = true, 5000)
    }
  }


}
