import { Component, OnInit } from '@angular/core';
import { Packaging } from 'src/app/interfaces/package';
import { PackagesService } from 'src/app/services/packages.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {

  constructor(private packageService: PackagesService) { }

  ngOnInit(): void {
    this.getPackages(); //Load package data when user loads this page
  }

  packages: Packaging[] = []; //Packages will be stored here
  packagesSuccessfullyLoaded = true;
  getPackages(): void { //Will load all the packages data via the packageservice
    this.packageService.getPackages().subscribe({
      next: (v) => {
        this.packages = v
        this.packages.sort((d1, d2) => { //Sort loaded package data
          if(d1.id > d2.id) {
            return 1;
          } else if(d1.id < d2.id) {
            return -1;
          } else {
            return 0;
          }
        })
      },
      error: (e) => {
        console.error("Internal Server Error, the GET request for packages couldn't be processed. Try again later.");
        this.packagesSuccessfullyLoaded = false;
        setTimeout(() => window.location.reload(), 5000) //Reload page every 5 seconds
      },
    });
  }

}
