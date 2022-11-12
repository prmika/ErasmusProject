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

  departure_warehouseId: string | undefined;
  destination_warehouseId: string | undefined;
  distance: number | undefined;
  time: number | undefined;
  used_battery: number | undefined;
  extra_time_when_charging_required: number | undefined;

  notAllFieldsHaveDataErrorHidden = true;
  warehouseRouteWasSuccessfullyAddedHidden = true;
  warehouseRouteWasNotAddedErrorHidden = true;

  min2WarehouseSuccessfullyLoaded = false;
  ngOnInit(): void {
    this.warehouseService.getWarehouses().subscribe({
      next: (v) => {
        v.forEach(warehouse => this.warehouseIds.push(warehouse.id));
        this.warehouseIds.sort();
        if(this.warehouseIds.length < 2){
          this.min2WarehouseSuccessfullyLoaded = false;
        }   
        else{
          this.departure_warehouseId = this.warehouseIds[0];
          this.destination_warehouseId = this.warehouseIds[1];
          this.min2WarehouseSuccessfullyLoaded = true;
        }
      },
      error: (e) => {
        console.error("Internal Server Error, the GET request for warehouses couldn't be processed, which means no routes can't be added at the moment. Try again later.");
        this.min2WarehouseSuccessfullyLoaded = false;
      },
    })
  }

  warehouseIds: string[] = []

  addWarehouseRoute(): void{
    if ((this.departure_warehouseId != this.destination_warehouseId) && 
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
    this.warehouseRouteService.addWarehouseRoute(body as WarehouseRouteAdd).subscribe({
      next: (v) => {
        this.warehouseRouteWasSuccessfullyAddedHidden = false;
        setTimeout(() => {window.location.href = 'warehouse-routes'; this.warehouseRouteWasSuccessfullyAddedHidden = true;}, 5000)      
      },
      error: (e) => {
        this.warehouseRouteWasNotAddedErrorHidden = false;
        console.error("Internal Server Error, the POST request for a new Warehouse Route couldn't be processed. Try again later.");
        setTimeout(() => {this.warehouseRouteWasNotAddedErrorHidden = true;}, 5000)    
      },
    })
    }
    else{
      this.notAllFieldsHaveDataErrorHidden = false;
      setTimeout(()=> this.notAllFieldsHaveDataErrorHidden = true, 5000)
    }
  }

}
