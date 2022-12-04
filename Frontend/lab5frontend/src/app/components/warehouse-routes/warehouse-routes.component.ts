import { Component, OnInit } from '@angular/core';
import { WarehouseRoute } from 'src/app/interfaces/warehouse-route';
import { WarehouseRouteService } from 'src/app/services/warehouse-route.service';

@Component({
  selector: 'app-warehouse-routes',
  templateUrl: './warehouse-routes.component.html',
  styleUrls: ['./warehouse-routes.component.css']
})
export class WarehouseRoutesComponent implements OnInit {

  constructor(private warehouseRouteService: WarehouseRouteService) { }

  ngOnInit(): void {
    this.getWarehouseRoutes(); //Load warehouse routes data when user loads this page
  }

  warehouseRoutes: WarehouseRoute[] = []; //Warehouses routes will be stored here
  warehouseRoutesSuccessfullyLoaded = true;
  getWarehouseRoutes(): void { //Will load all the warehouses routes data via the warehouseRoutesservice
    this.warehouseRouteService.getWarehousesRoutes().subscribe({
      next: (v) => {
        this.warehouseRoutes = v //Assign result to warehouseroute variable
      },
      error: (e) => {
        console.error("Internal Server Error, the GET request for warehouses routes couldn't be processed. Try again later.");
        this.warehouseRoutesSuccessfullyLoaded = false;
        setTimeout(() => window.location.reload(), 5000) //Reload page every 5 seconds
      },
    });
  }

}
