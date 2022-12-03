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
  }

  selectedDate: string | undefined; //The date the user selects via the field
  planning: string[] | undefined; //Best path data will be stored here
  deliveryDataNotFoundHidden = true; //Hides error that will only be shown when no data could be found for a selected date.

  retrievePlanning(){
    if (this.selectedDate != undefined){
      if(this.selectedDate == "2022-12-05"){ //Only possible date for now
        let planningWarehouses = this.planningService.getPlanning();
        this.warehouseService.getWarehouses().subscribe({
          next: (v) => {
            //Will read warehouse ids and convert it to readable names.
            this.planning = v.filter(warehouse => planningWarehouses.includes(Number.parseInt(warehouse.id.charAt(2))) || planningWarehouses.includes(Number.parseInt(warehouse.id.slice(1)))).map(warehouse => warehouse.designation);
          }
        })
      }
      else{
        this.deliveryDataNotFoundHidden = false; //Show no data error
        setTimeout(() => this.deliveryDataNotFoundHidden = true, 5000); //Hides error again after 5 seconds
      }
    }
  }
}
