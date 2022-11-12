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
    this.getWarehouseRoutes();
  }

  warehouseRoutes: WarehouseRoute[] = [];
  warehouseRoutesSuccessfullyLoaded = true;
  getWarehouseRoutes(): void {
    this.warehouseRouteService.getWarehousesRoutes().subscribe({
      next: (v) => {
        this.warehouseRoutes = v
      },
      error: (e) => {
        console.error("Internal Server Error, the GET request for warehouses routes couldn't be processed. Try again later.");
        this.warehouseRoutesSuccessfullyLoaded = false;
        setTimeout(() => window.location.reload(), 5000)
      },
    });
  }

}
