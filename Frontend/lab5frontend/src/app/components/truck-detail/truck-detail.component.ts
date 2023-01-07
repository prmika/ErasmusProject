import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Truck } from 'src/app/interfaces/truck';
import { TruckService } from 'src/app/services/truck.service';
import { Location } from '@angular/common';
import { Router } from 'express';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-truck-detail',
  templateUrl: './truck-detail.component.html',
  styleUrls: ['./truck-detail.component.css']
})
export class TruckDetailComponent implements OnInit {

  //Fields to store truck data and values to hide notifications
  truck: Truck | undefined;
  successnotificationHidden = true;
  errornotificationHidden = true;

  role: string | undefined;
  notFoundHidden = true;
  constructor(
    private route: ActivatedRoute, //We need this to read the current route url
    private truckService: TruckService, //Service to work with the data. This is in connection with the truck backend and the database.
    public auth: AuthService, private user: UserService
  ) { }

  ngOnInit(): void {
    if (this.auth.user$) {
      this.auth.user$.subscribe(
        (profile) => {
          this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
            if (isAuthenticated) {
              this.user.getUser(profile.email).subscribe({
                next: (data) => {
                  this.role = data.role;
                  if (this.role == "admin" || this.role == "fleet_manager") {
                    this.getTruck(); //Load the detailed truck data when loading this page
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
  }

  getTruck(): void {
    const id = String(this.route.snapshot.paramMap.get('id')); //Reads the truck id parameter at the end of the route url
    this.truckService.getTruck(id) //Uses truckservice to get the truck data associated with the entered id.
      .subscribe({
        next: (v) => {
          this.truck = v
        },
        error: (e) => {
          console.error("Internal Server Error, the GET request for trucks couldn't be processed. Try again later.");
          setTimeout(() => window.location.reload(), 5000)
        },
      });
  }

  updateTruck(): void {
    if (this.truck) { //Truck can't be undefined
      this.truckService.updateTruck(this.truck.id, this.truck).subscribe({ //Uses truckservice to update the truck based on the data the truck parameter has (this might have been changed by the user in the template thanks to the ngModel)
        next: (v) => {
          this.successnotificationHidden = false; //Show success message
          console.log(v);
          setTimeout(() => {
            this.successnotificationHidden = true;
            window.location.href = 'trucks';
          }, 4000) //Will redirect to truck listing page and hide success message after 4 seconds
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
