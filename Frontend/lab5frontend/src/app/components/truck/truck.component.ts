import { Component, OnInit } from '@angular/core';
import { Truck } from 'src/app/interfaces/truck';
import { TruckService } from 'src/app/services/truck.service';

@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.css']
})
export class TruckComponent implements OnInit {

  constructor(private truckService: TruckService) { }

  ngOnInit(): void {
    this.getTrucks();
  }

  trucks: Truck[] = [];
  trucksSuccessfullyLoaded = false;
  getTrucks(): void {
    this.truckService.getTrucks().subscribe({
      next: (v) => {
        this.trucksSuccessfullyLoaded = true;
        this.trucks = v
      },
      error: (e) => {
        console.error("Internal Server Error, the GET request for trucks couldn't be processed. Try again later.");
        setTimeout(() => window.location.reload(), 5000)
      },
    });
  }

}
