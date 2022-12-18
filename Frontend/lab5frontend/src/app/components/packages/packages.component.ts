import { Component, OnInit } from '@angular/core';
import { Packaging } from 'src/app/interfaces/package';
import { PackagesService } from 'src/app/services/packages.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {

  sortfilters = ["id", "truckToPlace", "deliveryId", "placementX", "placementY", "placementZ"];
  chosenSorting = this.sortfilters[0];

  filters = ["truckToPlace", "deliveryId", "placementX", "placementY", "placementZ"];
  chosenFilter = this.filters[0];
  stringFilterValue: string | undefined;
  numericFilterValue: Number | undefined;

  amountFilters = [1, 5, 10, 25];
  amountOfShowedItems = this.amountFilters[0];
  totalAmountOfPages = 0;
  currentPage = 0;
  previousPage = 0;
  nextPage = 0;

  constructor(private packageService: PackagesService) { }

  ngOnInit(): void {
    this.getPackages(); //Load package data when user loads this page
  }

  packages: Packaging[] = []; //Packages will be stored here
  packagesSuccessfullyLoaded = true;

  getPackages(): void { //Will load all the packages data via the packageservice
    this.packageService.getPackages().subscribe({
      next: (v) => {
        this.totalAmountOfPages = Math.ceil(v.length / this.amountOfShowedItems);
        this.currentPage = 1;
        this.nextPage = 2;
        if (this.totalAmountOfPages > 1) {
          this.packages = v.slice(0, this.amountOfShowedItems)
        }
        else {
          this.packages = v
        }
        this.packages.sort((p1, p2) => { //Sort loaded package data
          if (p1.id > p2.id) {
            return 1;
          } else if (p1.id < p2.id) {
            return -1;
          } else {
            return 0;
          }
        })
      },
      error: (e) => {
        console.error("Internal Server Error, the GET request for packages couldn't be processed. Try again later."); //Show error when packages can't get loaded.
        this.packagesSuccessfullyLoaded = false;
        setTimeout(() => window.location.reload(), 5000) //Reload page every 5 seconds
      },
    });
  }

  goToNextPage(): void {
    if (this.nextPage <= this.totalAmountOfPages) {
      this.previousPage++;
      this.currentPage++;
      this.nextPage++;
      this.getPackagesPaged();
    }
  }

  goToPreviousPage(): void {
    if (this.previousPage > 0) {
      this.previousPage--;
      this.currentPage--;
      this.nextPage--;
      this.getPackagesPaged();
    }
  }

  updateAmountOfItems(): void {
    this.previousPage = 0;
    this.currentPage = 1;
    this.nextPage = 2;
    this.getPackagesPaged();
    this.totalAmountOfPages = Math.ceil(this.packages.length / this.amountOfShowedItems);
    
  }

  getPackagesPaged(): void {
    this.packageService.getPackagesPaged(this.currentPage, this.amountOfShowedItems).subscribe({
      next: (v) => {
        this.packages = v;
        this.packagesSuccessfullyLoaded = true;
      },
      error: (e) => {
        console.error("Internal Server Error, the GET request for packages by page and item amount couldn't be processed. Try again later."); //Show error when packages can't get loaded.
        this.packagesSuccessfullyLoaded = false;
        setTimeout(() => window.location.reload(), 5000) //Reload page every 5 seconds
      }
    });
  }

  filterData(): void {
    if (this.chosenFilter == "truckToPlace" || this.chosenFilter == "deliveryId") {
      if (this.stringFilterValue != undefined && this.stringFilterValue != "") {
        this.packageService.getPackages().subscribe({
          next: (v) => {
            if (this.chosenFilter == "truckToPlace") {
              this.packages = v.filter(del => del.truckToPlace == this.stringFilterValue);
            }
            else {
              console.log(this.stringFilterValue)
              this.packages = v.filter(del => del.deliveryId.split("T")[0] == this.stringFilterValue);
            }
          },
          error: (e) => {
            console.error("Internal Server Error while trying to filter the data. Try again later.");
          },
        });
      }
      else {
        this.getPackages();
      }
    }
    else {
      if (this.numericFilterValue != undefined) {
        this.packageService.getPackages().subscribe({
          next: (v) => {
            if (this.chosenFilter == "placementX") {
              this.packages = v.filter(del => del.placementX == this.numericFilterValue);
            }
            else if (this.chosenFilter == "placementY") {
              this.packages = v.filter(del => del.placementY == this.numericFilterValue);
            }
            else {
              this.packages = v.filter(del => del.placementZ == this.numericFilterValue);
            }
          },
          error: (e) => {
            console.error("Internal Server Error while trying to filter the data. Try again later.");
          },
        });
      }
      else {
        this.getPackages();
      }
    }
  }

  sortData(): void {
    this.packages = this.packages.sort((p1, p2) => { //Sort loaded package data
      if (this.chosenSorting == "id") {
        if (p1.id > p2.id) {
          return 1;
        } else if (p1.id < p2.id) {
          return -1;
        } else {
          return 0;
        }
      }
      else if (this.chosenSorting == "truckToPlace") {
        if (p1.truckToPlace > p2.truckToPlace) {
          return 1;
        } else if (p1.truckToPlace < p2.truckToPlace) {
          return -1;
        } else {
          return 0;
        }
      }
      else if (this.chosenSorting == "deliveryId") {
        if (p1.deliveryId > p2.deliveryId) {
          return 1;
        } else if (p1.deliveryId < p2.deliveryId) {
          return -1;
        } else {
          return 0;
        }
      }
      else if (this.chosenSorting == "placementX") {
        if (p1.placementX > p2.placementX) {
          return 1;
        } else if (p1.placementX < p2.placementX) {
          return -1;
        } else {
          return 0;
        }
      }
      else if (this.chosenSorting == "placementY") {
        if (p1.placementY > p2.placementY) {
          return 1;
        } else if (p1.placementY < p2.placementY) {
          return -1;
        } else {
          return 0;
        }
      }
      else {
        if (p1.placementZ > p2.placementZ) {
          return 1;
        } else if (p1.placementZ < p2.placementZ) {
          return -1;
        } else {
          return 0;
        }
      }
    });
  }
}
