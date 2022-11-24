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
    private route: ActivatedRoute, //We need this to read the current route url
    private warehouseService: WarehouseService //Service to work with the data. This is in connection with the warehouse backend and the database.
  ) { }

  ngOnInit(): void {
    this.getWarehouse(); //Load the detailed warehouse data when loading this page
  }

  getWarehouse(): void {
    const id = String(this.route.snapshot.paramMap.get('id')); //Reads the warehouse id parameter at the end of the route url
    this.warehouseService.getWarehouse(id) //Uses warehouseservice to get the warehouse data associated with the entered id.
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
      this.warehouseService.updateWarehouse(this.warehouse.id, this.warehouse).subscribe({ //Uses warehouseservice to update the warehouse based on the data the warehouse parameter has (this might have been changed by the user in the template thanks to the ngModel)
        next: (v) => {
          this.successnotificationHidden = false; //Show success message
          console.log(v);
          setTimeout(() => {
            this.successnotificationHidden = true;
            window.location.href = 'warehouses';
          }, 4000) //Will redirect to warehouse listing page and hide success message after 4 seconds
        },
        error: (e) => {
          this.errornotificationHidden = false; //Will show failure message
          console.error("Internal Server Error, the PUT request couldn't be processed. Try again later.");
          setTimeout(() => {
            this.errornotificationHidden = true;
          }, 4000) //Will reset failure message after 4 seconds
        },
      })
    }
  }

}
