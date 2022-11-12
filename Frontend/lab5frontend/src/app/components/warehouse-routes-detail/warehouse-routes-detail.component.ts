import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WarehouseRoute } from 'src/app/interfaces/warehouse-route';
import { WarehouseRouteService } from 'src/app/services/warehouse-route.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-warehouse-routes-detail',
  templateUrl: './warehouse-routes-detail.component.html',
  styleUrls: ['./warehouse-routes-detail.component.css']
})
export class WarehouseRoutesDetailComponent implements OnInit {

  warehouseRoute: WarehouseRoute | undefined;
  successnotificationHidden = true;
  errornotificationHidden = true;
  warehouseIds: string[] = []
  min2WarehouseSuccessfullyLoaded = false;
  notAllFieldsHaveDataErrorHidden = true;

  constructor(
    private route: ActivatedRoute,
    private warehouseRouteService: WarehouseRouteService,
    private warehouseService: WarehouseService
  ) { }

  ngOnInit(): void {
    this.getWarehouseRoute();
    this.warehouseService.getWarehouses().subscribe({
      next: (v) => {
        v.forEach(warehouse => this.warehouseIds.push(warehouse.id));
        this.warehouseIds.sort();
        if (this.warehouseIds.length < 2) {
          this.min2WarehouseSuccessfullyLoaded = false;
        }
        else {
          this.min2WarehouseSuccessfullyLoaded = true;
        }
        console.log(this.warehouseIds);
      },
      error: (e) => {
        console.error("Internal Server Error, the GET request for warehouses couldn't be processed, which means no routes can't be added at the moment. Try again later.");
        this.min2WarehouseSuccessfullyLoaded = false;
      },
    })
  }

  getWarehouseRoute(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    console.log(id)
    this.warehouseRouteService.getWarehouseRoute(id)
      .subscribe({
        next: (v) => {
          this.warehouseRoute = v
        },
        error: (e) => {
          console.error("Internal Server Error, the GET request for warehouse route couldn't be processed. Try again later.");
          setTimeout(() => window.location.reload(), 5000)
        },
      });
  }

  updateWarehouseRoute(): void {
    if (this.warehouseRoute) {
      if ((this.warehouseRoute.departure_warehouseId != this.warehouseRoute.destination_warehouseId) &&
        (this.warehouseRoute.distance != undefined && this.warehouseRoute.distance > 0) &&
        (this.warehouseRoute.time != undefined && this.warehouseRoute.time > 0) &&
        (this.warehouseRoute.used_battery != undefined && this.warehouseRoute.used_battery > 0) &&
        (this.warehouseRoute.extra_time_when_charging_required != undefined && this.warehouseRoute.extra_time_when_charging_required > 0)) {
        this.warehouseRouteService.updateWarehouseRoute(this.warehouseRoute.id, this.warehouseRoute).subscribe({
          next: (v) => {
            this.successnotificationHidden = false;
            console.log(v);
            setTimeout(() => {
              this.successnotificationHidden = true;
              window.location.href = 'warehouse-routes';
            }, 4000)
          },
          error: (e) => {
            this.errornotificationHidden = false;
            console.error("Internal Server Error, the PUT request couldn't be processed. Try again later.");
            setTimeout(() => {
              this.errornotificationHidden = true;
            }, 4000)
          },
        })
      }
      else {
        setTimeout(() => this.notAllFieldsHaveDataErrorHidden = false, 5000);
      }
    }
  }
}
