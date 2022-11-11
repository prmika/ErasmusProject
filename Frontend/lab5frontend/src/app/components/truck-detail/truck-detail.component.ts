import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from 'src/app/hero.service';
import { Truck } from 'src/app/interfaces/truck';
import { TruckService } from 'src/app/services/truck.service';
import { Location } from '@angular/common';
import { Router } from 'express';


@Component({
  selector: 'app-truck-detail',
  templateUrl: './truck-detail.component.html',
  styleUrls: ['./truck-detail.component.css']
})
export class TruckDetailComponent implements OnInit {

  truck: Truck | undefined;
  successnotificationHidden = true;
  errornotificationHidden = true;

  constructor(
    private route: ActivatedRoute,
    private truckService: TruckService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getTruck();
  }

  getTruck(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.truckService.getTruck(id)
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
    if (this.truck) {
      this.truckService.updateTruck(this.truck.id, this.truck).subscribe({
        next: (v) => {
          this.successnotificationHidden = false;
          console.log(v);
          setTimeout(() => {
            this.successnotificationHidden = true;
            window.location.href = 'trucks';
          }, 4000)
        },
        error: (e) => {
          this.errornotificationHidden = false;
          console.error("Internal Server Error, the PUT request couldn't be processed. Try again later.");
          setTimeout(() => {
            this.errornotificationHidden = true;
          }, 4000)
        },
      })

    }
    // setTimeout(() => {
    //   window.location.href = 'trucks';
    // },4000)
  }

}
