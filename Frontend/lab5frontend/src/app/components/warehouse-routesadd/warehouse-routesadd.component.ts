import { Component, OnInit } from '@angular/core';
import { WarehouseRoute } from 'src/app/interfaces/warehouse-route';
import { WarehouseRouteAdd } from 'src/app/interfaces/warehouse-route-add';
import { WarehouseRouteService } from 'src/app/services/warehouse-route.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-warehouse-routesadd',
  templateUrl: './warehouse-routesadd.component.html',
  styleUrls: ['./warehouse-routesadd.component.css']
})
export class WarehouseRoutesaddComponent implements OnInit {

  constructor(private warehouseService: WarehouseService, private warehouseRouteService : WarehouseRouteService) { }

  ngOnInit(): void {
    this.warehouseService.getWarehouses().subscribe({
      next: (v) => {
        v.forEach(warehouse => this.warehouseIds.push(warehouse.id)); //For each received warehouse the id will be pushed to the warehouseIds list.
        this.warehouseIds.sort(); //WarehouseIds list will be sorted.
        if(this.warehouseIds.length < 2){
          this.min2WarehouseSuccessfullyLoaded = false; //If less than two warehouse exists this variable should be false so that on the html page the form won't be visible to create a new delivery.
        }   
        else{
          this.departure_warehouseId = this.warehouseIds[0]; //Default selected departure warehouse is the first warehouse in the id list
          this.destination_warehouseId = this.warehouseIds[1]; //Default selected destination warehouse is the second warehouse in the id list
          this.min2WarehouseSuccessfullyLoaded = true; //Set to true so that the form is visible
        }
      },
      error: (e) => {
        console.error("Internal Server Error, the GET request for warehouses couldn't be processed, which means no routes can't be added at the moment. Try again later.");
        this.min2WarehouseSuccessfullyLoaded = false; //When there's an error to load warehouses it shouldn't be possible to create a warehouse route.
      },
    })
  }

  //All the delivery fields
  departure_warehouseId: string | undefined;
  destination_warehouseId: string | undefined;
  distance: number | undefined;
  time: number | undefined;
  used_battery: number | undefined;
  extra_time_when_charging_required: number | undefined;

  //All the message hidden status variables
  notAllFieldsHaveDataErrorHidden = true;
  warehouseRouteWasSuccessfullyAddedHidden = true;
  warehouseRouteWasNotAddedErrorHidden = true;

  warehouseIds: string[] = [] //Stores warehouse ids
  min2WarehouseSuccessfullyLoaded = false; //Stores value to know if at least 2 warehouses were successfully loaded

  addWarehouseRoute(): void{
    if ((this.departure_warehouseId != this.destination_warehouseId) && //Check that all the data is not undefined
    (this.distance != undefined && this.distance > 0) && 
    (this.time != undefined && this.time > 0) &&
    (this.used_battery != undefined && this.used_battery > 0) &&
    (this.extra_time_when_charging_required != undefined && this.extra_time_when_charging_required > 0)){
      let body = {
        "departure_warehouseId": this.departure_warehouseId,
        "destination_warehouseId": this.destination_warehouseId,
        "distance": this.distance,
        "time": this.time,
        "used_battery": this.used_battery,
        "extra_time_when_charging_required": this.extra_time_when_charging_required
    }
    this.warehouseRouteService.addWarehouseRoute(body as WarehouseRouteAdd).subscribe({ //Use the deliveryservice to create a warehouse route.
      next: (v) => {
        this.warehouseRouteWasSuccessfullyAddedHidden = false; //Show success message
        setTimeout(() => {window.location.href = 'warehouse-routes'; this.warehouseRouteWasSuccessfullyAddedHidden = true;}, 5000) //Will redirect to warehouse route listing page and hide success message after 5 seconds      
      },
      error: (e) => {
        this.warehouseRouteWasNotAddedErrorHidden = false; //Will show failure message
        console.error("Internal Server Error, the POST request for a new Warehouse Route couldn't be processed. Try again later.");
        setTimeout(() => {this.warehouseRouteWasNotAddedErrorHidden = true;}, 5000) //Will reset failure message after 5 seconds
      },
    })
    }
    else{
      this.notAllFieldsHaveDataErrorHidden = false; //Will show failure message because not all fields have data
      setTimeout(()=> this.notAllFieldsHaveDataErrorHidden = true, 5000) //Will reset failure message because not all fields have data after 5 seconds
    }
  }

}
