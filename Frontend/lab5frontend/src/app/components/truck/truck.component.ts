import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { Truck } from 'src/app/interfaces/truck';
import { TruckService } from 'src/app/services/truck.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.css']
})
export class TruckComponent implements OnInit {

  constructor(private truckService: TruckService, public auth: AuthService, private user: UserService) { }
  role: string | undefined;
  notFoundHidden = true;
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
                    this.getTrucks(); //Load truck data when user loads this page
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

  trucks: Truck[] = []; //Trucks will be stored here
  trucksSuccessfullyLoaded = true;
  getTrucks(): void { //Will load all the truck data via the truckservice
    this.truckService.getTrucks().subscribe({
      next: (v) => {
        this.trucks = v //Assign result to the truck list
      },
      error: (e) => {
        this.trucksSuccessfullyLoaded = false;
        console.error("Internal Server Error, the GET request for trucks couldn't be processed. Try again later.");
        setTimeout(() => window.location.reload(), 5000) //Reload page every 5 seconds
      },
    });
  }

}
