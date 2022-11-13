import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveriesComponent } from './components/deliveries/deliveries.component';
import { DeliveryDetailComponent } from './components/delivery-detail/delivery-detail.component';
import { DeliveryaddComponent } from './components/deliveryadd/deliveryadd.component';
import { TruckDetailComponent } from './components/truck-detail/truck-detail.component';
import { TruckComponent } from './components/truck/truck.component';
import { TruckAddComponent } from './components/truckadd/truckadd.component';
import { WarehouseDetailComponent } from './components/warehouse-detail/warehouse-detail.component';
import { WarehouseRoutesDetailComponent } from './components/warehouse-routes-detail/warehouse-routes-detail.component';
import { WarehouseRoutesComponent } from './components/warehouse-routes/warehouse-routes.component';
import { WarehouseRoutesaddComponent } from './components/warehouse-routesadd/warehouse-routesadd.component';
import { WarehouseAddComponent } from './components/warehouseadd/warehouseadd.component';
import { WarehousesComponent } from './components/warehouses/warehouses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';

const routes: Routes = [
  { path: '', redirectTo: '/trucks', pathMatch: 'full' },
  { path: 'deliveries', component: DeliveriesComponent },
  { path: 'delivery/create', component: DeliveryaddComponent },
  { path: 'delivery/:id', component: DeliveryDetailComponent },
  { path: 'trucks', component: TruckComponent },
  { path: 'truck/create', component: TruckAddComponent},
  { path: 'truck/:id', component: TruckDetailComponent },
  { path: 'warehouses', component: WarehousesComponent },
  { path: 'warehouse/create', component: WarehouseAddComponent},
  { path: 'warehouse/:id', component: WarehouseDetailComponent },
  { path: 'warehouse-routes', component: WarehouseRoutesComponent },
  { path: 'warehouse-route/create', component: WarehouseRoutesaddComponent },
  { path: 'warehouse-route/:id', component: WarehouseRoutesDetailComponent },
  { path: '**', redirectTo: '/trucks', pathMatch: 'full' }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
