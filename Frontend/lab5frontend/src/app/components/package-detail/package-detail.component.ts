import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Packaging } from 'src/app/interfaces/package';
import { PackagingAdd } from 'src/app/interfaces/package-add';
import { DeliveryService } from 'src/app/services/delivery.service';
import { PackagesService } from 'src/app/services/packages.service';
import { TruckService } from 'src/app/services/truck.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.css']
})
export class PackageDetailComponent implements OnInit {

  role: string | undefined;
  notFoundHidden = true;
  constructor(private route: ActivatedRoute, private truckService: TruckService, private deliveryService: DeliveryService, private packagingService: PackagesService, public auth: AuthService, private user: UserService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => {
        this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
          if (isAuthenticated) {
            this.user.getUser(profile.email).subscribe({
              next: (data) => {
                this.role = data.role;
                if (this.role == "admin" || this.role == "logistics_manager") {
                  this.getPackage();
                  this.loadTruckIds();
                  this.loadDeliveryIds();
                }
                else {
                  this.notFoundHidden = false;
                }
              }
            });
          }
          else {
            this.notFoundHidden = false;
          }
        })
      });
  }

  //All the packaging fields
  singlePackage: Packaging | undefined;

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
              if (this.deliveryIds.includes(singlePackage.deliveryId) && singlePackage.deliveryId != this.singlePackage?.deliveryId) {
                this.deliveryIds.splice(this.deliveryIds.indexOf(singlePackage.deliveryId), 1);
              }
            });
          }
        });
        if (this.deliveryIds.length < 1) {
          this.min1DeliverySuccessfullyLoaded = false; //If less than one delivery exists this variable should be false so that on the html page the form won't be visible to do some packaging.
        }
        else {
          this.min1DeliverySuccessfullyLoaded = true; //Set to true so that the form is visible
        }
      },
      error: (e) => {
        console.error("Internal Server Error, the GET request for trucks couldn't be processed, which means no packaging can't be done at the moment. Try again later.");
        this.min1DeliverySuccessfullyLoaded = false; //When there's an error to load deliveries it shouldn't be possible to do some packaging.
      },
    })
  }

  getPackage(): void {
    const id = String(this.route.snapshot.paramMap.get('id')); //Reads the package id parameter at the end of the route url
    this.packagingService.getPackage(id) //Uses packageservice to get the package data associated with the entered id.
      .subscribe({
        next: (v) => {
          this.singlePackage = v
        },
        error: (e) => {
          console.error("Internal Server Error, the GET request for trucks couldn't be processed. Try again later.");
          setTimeout(() => window.location.reload(), 5000)
        },
      });
  }

  updatePackage(): void {
    if (this.singlePackage) { //Package can't be undefined
      if ((this.singlePackage.truckToPlace != undefined) && //Check that all the data is not undefined
        (this.singlePackage.deliveryId != undefined) &&
        (this.singlePackage.placementX != undefined && this.singlePackage.placementX >= 0) &&
        (this.singlePackage.placementY != undefined && this.singlePackage.placementY >= 0) &&
        (this.singlePackage.placementZ != undefined && this.singlePackage.placementZ >= 0)) {
        let body = {
          "id": this.singlePackage.id,
          "truckToPlace": this.singlePackage.truckToPlace,
          "deliveryId": this.singlePackage.deliveryId,
          "placementX": this.singlePackage.placementX,
          "placementY": this.singlePackage.placementY,
          "placementZ": this.singlePackage.placementZ
        }
        this.packagingService.updatePackage(this.singlePackage.id, body as Packaging).subscribe({ //Use the packageservice to update a package.
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

}
