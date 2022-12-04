import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TruckComponent } from './components/truck/truck.component';
import { TruckDetailComponent } from './components/truck-detail/truck-detail.component';
import { WarehousesComponent } from './components/warehouses/warehouses.component';
import { TruckAddComponent } from './components/truckadd/truckadd.component';
import { WarehouseDetailComponent } from './components/warehouse-detail/warehouse-detail.component';
import { WarehouseAddComponent } from './components/warehouseadd/warehouseadd.component';
import { WarehouseRoutesComponent } from './components/warehouse-routes/warehouse-routes.component';
import { WarehouseRoutesaddComponent } from './components/warehouse-routesadd/warehouse-routesadd.component';
import { WarehouseRoutesDetailComponent } from './components/warehouse-routes-detail/warehouse-routes-detail.component';
import { DeliveriesComponent } from './components/deliveries/deliveries.component';
import { DeliveryDetailComponent } from './components/delivery-detail/delivery-detail.component';
import { DeliveryaddComponent } from './components/deliveryadd/deliveryadd.component';
import { PackagesComponent } from './components/packages/packages.component';
import { PlanningComponent } from './components/planning/planning.component';
import { PackageaddComponent } from './components/packageadd/packageadd.component';
import { PackageDetailComponent } from './components/package-detail/package-detail.component';

@NgModule({
  declarations: [ //Declares all the Components so that we can use them.
    AppComponent,
    TruckComponent,
    TruckDetailComponent,
    WarehousesComponent,
    TruckAddComponent,
    WarehouseDetailComponent,
    WarehouseAddComponent,
    WarehouseRoutesComponent,
    WarehouseRoutesaddComponent,
    WarehouseRoutesDetailComponent,
    DeliveriesComponent,
    DeliveryDetailComponent,
    DeliveryaddComponent,
    PackagesComponent,
    PlanningComponent,
    PackageaddComponent,
    PackageDetailComponent
  ],
  imports: [ //Imports certain modules that we need to have the application working correctly.
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
