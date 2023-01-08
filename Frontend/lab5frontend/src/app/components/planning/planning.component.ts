import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Delivery } from 'src/app/interfaces/delivery';
import { Truck } from 'src/app/interfaces/truck';
import { DeliveryService } from 'src/app/services/delivery.service';
import { PlanningService } from 'src/app/services/planning.service';
import { TruckService } from 'src/app/services/truck.service';
import { UserService } from 'src/app/services/user.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  role: string | undefined;
  notFoundHidden = true;
  constructor(private deliveryService: DeliveryService, private truckService: TruckService, public auth: AuthService, private user: UserService) { }

  ngOnInit(): void {
    if (this.auth.user$) {
      this.auth.user$.subscribe(
        (profile) => {
          this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
            if (isAuthenticated) {
              this.user.getUser(profile.email).subscribe({
                next: (data) => {
                  this.role = data.role;
                  if (this.role != "logistics_manager" && this.role != "admin") {
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

  selectedDate: string | undefined; //The date the user selects via the field
  deliveryDataNotFoundHidden = true; //Hides error that will only be shown when no data could be found for a selected date.

  retrievePlanning() {
    if (this.selectedDate != undefined) {
        this.getPlanning();
    }
  }

  deliveries: Delivery[] = [];
  trucks: Truck[] = [];
  planning = {};
  planningLoaded = false;

  getPlanning(): void { //Will load the planning data
    let date1 = new Date(this.selectedDate).getTime();
    this.deliveryService.getDeliveries().subscribe({
      next: (v) => {
        console.log(v);
          this.deliveries = v;
          this.truckService.getTrucks().subscribe({
            next: (t) => {
                this.planning = {};
                this.trucks = t;
                this.trucks.forEach(truck => {
                  this.planning[truck.id] = ['W05'];
                })
                this.deliveries.forEach(delivery => {
                  let isDone = false;  
                  while (!isDone) {
                    let truck = this.trucks[Math.floor(Math.random() * this.trucks.length)];
                    let date2 = new Date(delivery.deliveryDate).getTime();
                    if (delivery.weight <= truck.load_capacity && truck.status && date1 == date2){
                      isDone = true;
                      truck.load_capacity -= delivery.weight;
                      this.planning[truck.id].push(delivery.warehouseID)
                    }
                    else if (!truck.status || date1 != date2){
                      isDone = true;
                    }
                  }
                });
                this.trucks.forEach(truck => {
                  if(this.planning[truck.id].length > 1){
                    this.planning[truck.id].push('W05');
                  }
                  else{
                    this.planning[truck.id] = ["Doesn't have to drive"]
                  }
                })
                this.planningLoaded = true;
            },
            error: (e) => {
              this.planning = null;
            },
          });
      },
      error: (e) => {
        this.planning = null;
      },
    });
  }
}

