import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { TruckComponent } from './components/truck/truck.component';
import { TruckDetailComponent } from './components/truck-detail/truck-detail.component';
import { WarehousesComponent } from './components/warehouses/warehouses.component';
import { TruckAddComponent } from './components/truckadd/truckadd.component';
import { WarehouseDetailComponent } from './components/warehouse-detail/warehouse-detail.component';
import { WarehouseAddComponent } from './components/warehouseadd/warehouseadd.component';
import { WarehouseRoutesComponent } from './components/warehouse-routes/warehouse-routes.component';
import { WarehouseRoutesaddComponent } from './components/warehouse-routesadd/warehouse-routesadd.component';
import { WarehouseRoutesDetailComponent } from './components/warehouse-routes-detail/warehouse-routes-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    DashboardComponent,
    TruckComponent,
    TruckDetailComponent,
    WarehousesComponent,
    TruckAddComponent,
    WarehouseDetailComponent,
    WarehouseAddComponent,
    WarehouseRoutesComponent,
    WarehouseRoutesaddComponent,
    WarehouseRoutesDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
