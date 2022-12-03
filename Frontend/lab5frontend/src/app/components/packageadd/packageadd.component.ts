import { Component, OnInit } from '@angular/core';
import { Delivery } from 'src/app/interfaces/delivery';
import { Packaging } from 'src/app/interfaces/package';
import { PackagingAdd } from 'src/app/interfaces/package-add';
import { DeliveryService } from 'src/app/services/delivery.service';
import { PackagesService } from 'src/app/services/packages.service';
import { TruckService } from 'src/app/services/truck.service';

@Component({
  selector: 'app-packageadd',
  templateUrl: './packageadd.component.html',
  styleUrls: ['./packageadd.component.css']
})
export class PackageaddComponent implements OnInit {

  constructor(private truckService: TruckService, private deliveryService: DeliveryService, private packagingService: PackagesService) { }

  ngOnInit(): void {
    this.loadTruckIds();
    this.loadDeliveryIds();
  }

  //All the packaging fields
  id: string | undefined;
  truckToPlace: string | undefined;
  deliveryId: string | undefined;
  placementX: Number | undefined;
  placementY: Number | undefined;
  placementZ: Number | undefined;

  //All the message hidden status variables
  notAllFieldsHaveDataErrorHidden = true;
  packagingWasSuccessfullyDoneHidden = true;
  packagingWasNotDoneErrorHidden = true;

  truckIds: string[] = []
  deliveryIds: string[] = []
  min1TruckSuccessfullyLoaded = false;
  min1DeliverySuccessfullyLoaded = false;

  loadTruckIds(): void {
    this.truckService.getTrucks().subscribe({
      next: (v) => {
        v.forEach(truck => this.truckIds.push(truck.id)); //For each received truck the id will be pushed to the truckIds list.
        this.truckIds.sort(); //TruckIds list will be sorted.
        if (this.truckIds.length < 1) {
          this.min1TruckSuccessfullyLoaded = false; //If less than one truck exists this variable should be false so that on the html page the form won't be visible to do some packaging.
        }
        else {
          this.truckToPlace = this.truckIds[0]; //Default selected truckID is the first truck in the id list
          this.min1TruckSuccessfullyLoaded = true; //Set to true so that the form is visible
        }
      },
      error: (e) => {
        console.error("Internal Server Error, the GET request for trucks couldn't be processed, which means no packaging can't be done at the moment. Try again later.");
        this.min1TruckSuccessfullyLoaded = false; //When there's an error to load warehouses it shouldn't be possible to do some packaging.
      },
    })
  }

  loadDeliveryIds(): void {
    this.deliveryService.getDeliveries().subscribe({
      next: (v) => {
        v.forEach(delivery => this.deliveryIds.push(delivery.id)); //For each received delivery the id will be pushed to the deliveryIds list.
        this.deliveryIds.sort(); //DeliveryIds list will be sorted.
        this.packagingService.getPackages().subscribe({
          next: (v) => {
            v.forEach(singlePackage => {
              if (this.deliveryIds.includes(singlePackage.deliveryId)) {
                this.deliveryIds.splice(this.deliveryIds.indexOf(singlePackage.deliveryId), 1);
              }
            });
          }
        });
        if (this.deliveryIds.length < 1) {
          this.min1DeliverySuccessfullyLoaded = false; //If less than one delivery exists this variable should be false so that on the html page the form won't be visible to do some packaging.
        }
        else {
          this.deliveryId = this.deliveryIds[0]; //Default selected deliveryID is the first delivery in the id list
          this.min1DeliverySuccessfullyLoaded = true; //Set to true so that the form is visible
        }
      },
      error: (e) => {
        console.error("Internal Server Error, the GET request for trucks couldn't be processed, which means no packaging can't be done at the moment. Try again later.");
        this.min1DeliverySuccessfullyLoaded = false; //When there's an error to load deliveries it shouldn't be possible to do some packaging.
      },
    })
  }

  doPackaging(): void {
    if ((this.truckToPlace != undefined) && //Check that all the data is not undefined
      (this.deliveryId != undefined) &&
      (this.placementX != undefined && this.placementX >= 0) &&
      (this.placementY != undefined && this.placementY >= 0) &&
      (this.placementZ != undefined && this.placementZ >= 0)) {
      let body = {
        "truckToPlace": this.truckToPlace,
        "deliveryId": this.deliveryId,
        "placementX": this.placementX,
        "placementY": this.placementY,
        "placementZ": this.placementZ
      }
      this.packagingService.addPackage(body as PackagingAdd).subscribe({ //Use the deliveryservice to create a delivery.
        next: () => {
          this.packagingWasSuccessfullyDoneHidden = false; //Show success message
          setTimeout(() => { window.location.href = 'packages'; this.packagingWasSuccessfullyDoneHidden = true; }, 5000) //Will redirect to delivery listing page and hide success message after 5 seconds
        },
        error: () => {
          this.packagingWasNotDoneErrorHidden = false; //Will show failure message
          console.error("Internal Server Error, the POST request for a new Package couldn't be processed. Try again later.");
          setTimeout(() => { this.packagingWasNotDoneErrorHidden = true; }, 5000) //Will reset failure message after 5 seconds
        },
      })
    }
    else {
      this.notAllFieldsHaveDataErrorHidden = false; //Will show failure message because not all fields have data
      console.error("Not all necessary fields for a new Package were filled in. POST Request can only be executed when this is the case.");
      setTimeout(() => this.notAllFieldsHaveDataErrorHidden = true, 5000) //Will reset failure message because not all fields have data after 5 seconds
    }
  }

}
