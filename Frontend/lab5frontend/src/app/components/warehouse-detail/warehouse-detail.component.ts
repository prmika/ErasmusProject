import { Component, OnInit } from '@angular/core';
import { Warehouse } from 'src/app/interfaces/warehouse';
import { ActivatedRoute } from '@angular/router';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-warehouse-detail',
  templateUrl: './warehouse-detail.component.html',
  styleUrls: ['./warehouse-detail.component.css']
})
export class WarehouseDetailComponent implements OnInit {

  warehouse: Warehouse | undefined;
  successnotificationHidden = true;
  errornotificationHidden = true;

  constructor(
    private route: ActivatedRoute,
    private warehouseService: WarehouseService
  ) { }

  ngOnInit(): void {
    this.getWarehouse();
  }

  getWarehouse(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    console.log(id)
    this.warehouseService.getWarehouse(id)
      .subscribe({
        next: (v) => {
          this.warehouse = v
        },
        error: (e) => {
          console.error("Internal Server Error, the GET request for warehouse couldn't be processed. Try again later.");
          setTimeout(() => window.location.reload(), 5000)
        },
      }); 
  }

  updateWarehouse(): void {
    if (this.warehouse) {
      this.warehouseService.updateWarehouse(this.warehouse.id, this.warehouse).subscribe({
        next: (v) => {
          this.successnotificationHidden = false;
          console.log(v);
          setTimeout(() => {
            this.successnotificationHidden = true;
            window.location.href = 'warehouses';
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
  }

}
