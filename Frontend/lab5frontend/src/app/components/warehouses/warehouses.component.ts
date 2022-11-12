import { Component, OnInit } from '@angular/core';
import { Warehouse } from 'src/app/interfaces/warehouse';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehousesComponent implements OnInit {

  constructor(private warehouseService: WarehouseService) { }

  ngOnInit(): void {
    this.getWarehouses();
  }

  warehouses: Warehouse[] = [];
  warehousesSuccessfullyLoaded = true;
  getWarehouses(): void {
    this.warehouseService.getWarehouses().subscribe({
      next: (v) => {
        this.warehouses = v
        this.warehouses.sort((w1, w2) => {
          if(w1.id > w2.id) {
            return 1;
          } else if(w1.id < w2.id) {
            return -1;
          } else {
            return 0;
          }
        })
      },
      error: (e) => {
        console.error("Internal Server Error, the GET request for warehouses couldn't be processed. Try again later.");
        this.warehousesSuccessfullyLoaded = false;
        setTimeout(() => window.location.reload(), 5000)
      },
    });
  }


}
