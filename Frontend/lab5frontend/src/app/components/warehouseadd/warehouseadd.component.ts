import { Component, OnInit } from '@angular/core';
import { Warehouse } from 'src/app/interfaces/warehouse';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-warehouseadd',
  templateUrl: './warehouseadd.component.html',
  styleUrls: ['./warehouseadd.component.css']
})
export class WarehouseAddComponent implements OnInit {

  constructor(private warehouseService: WarehouseService) { }

  ngOnInit(): void {
  }

  id: string | undefined;
  designation: string | undefined;
  address: string | undefined;
  latitude: number | undefined;
  longitude: number | undefined;

  notAllFieldsHaveDataErrorHidden = true;
  warehouseWasSuccessfullyAddedHidden = true;
  warehouseWasNotAddedErrorHidden = true;

  addWarehouse(): void {
    if ((this.id != undefined && this.id != "" && this.id.toUpperCase().includes("W")) && (this.designation != undefined && this.designation != "") &&
      (this.address != undefined && this.address != "") &&
      (this.latitude != undefined) &&
      (this.longitude != undefined)) {
      let body = {
        "id": this.id,
        "designation": this.designation,
        "address": this.address,
        "latitude": this.latitude,
        "longitude": this.longitude
      }
      this.warehouseService.addWarehouse(body as Warehouse).subscribe({
        next: (v) => {
          this.warehouseWasSuccessfullyAddedHidden = false;
          setTimeout(() => {window.location.href = 'warehouses'; this.warehouseWasSuccessfullyAddedHidden = true;}, 5000)      
        },
        error: (e) => {
          this.warehouseWasNotAddedErrorHidden = false;
          console.error("Internal Server Error, the POST request for a new Warehouse couldn't be processed. Try again later.");
          setTimeout(() => {this.warehouseWasNotAddedErrorHidden = true;}, 5000)    
        },
      })
    }
    else{
      this.notAllFieldsHaveDataErrorHidden = false;
      console.error("Not all necessary fields for a new warehouse were filled in. POST Request can only be executed when this is the case.");
      setTimeout(() => this.notAllFieldsHaveDataErrorHidden = true, 5000)
    }
  }
}
