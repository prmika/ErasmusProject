import { Component, OnInit } from '@angular/core';
import { PlanningService } from 'src/app/services/planning.service';
import { TruckService } from 'src/app/services/truck.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  constructor(private truckService: TruckService, private warehouseService: WarehouseService, private planningService: PlanningService) { }

  ngOnInit(): void {
    this.truckService.getTrucks().subscribe({
      next: (v) => {
        v.forEach(truck => this.truckIds.push(truck.id));
        this.truckIds.sort();
        if(this.truckIds.length < 1){
          this.min1TruckSuccessfullyLoaded = false;
        }   
        else{
          this.truckId = this.truckIds[0];
          this.min1TruckSuccessfullyLoaded = true;
        }
      },
      error: (e) => {
        console.error("Internal Server Error, the GET request for trucks couldn't be processed, which means no planning can be made. Try again later.");
        this.min1TruckSuccessfullyLoaded = false;
      },
    })
  }

  truckId: string | undefined;
  selectedDate: string | undefined;
  truckIds: string[] = []
  min1TruckSuccessfullyLoaded = false;
  planning: string[] | undefined;

  retrievePlanning(){
    if(this.min1TruckSuccessfullyLoaded && this.truckId != undefined && this.selectedDate != undefined){
      let planningWarehouses = this.planningService.getPlanning();
      this.warehouseService.getWarehouses().subscribe({
        next: (v) => {
          console.log(v);
          this.planning = v.filter(warehouse => planningWarehouses.includes(warehouse.id.charAt(2)) || planningWarehouses.includes(warehouse.id.slice(1))).map(warehouse => warehouse.designation);
          console.log(this.planning);
        }
      })
    }
  }

}
