import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateuserComponent } from './components/createuser/createuser.component';
import { DeliveriesComponent } from './components/deliveries/deliveries.component';
import { DeliveryDetailComponent } from './components/delivery-detail/delivery-detail.component';
import { DeliveryaddComponent } from './components/deliveryadd/deliveryadd.component';
import { PackageDetailComponent } from './components/package-detail/package-detail.component';
import { PackageaddComponent } from './components/packageadd/packageadd.component';
import { PackagesComponent } from './components/packages/packages.component';
import { PlanningComponent } from './components/planning/planning.component';
import { TruckDetailComponent } from './components/truck-detail/truck-detail.component';
import { TruckComponent } from './components/truck/truck.component';
import { TruckAddComponent } from './components/truckadd/truckadd.component';
import { WarehouseDetailComponent } from './components/warehouse-detail/warehouse-detail.component';
import { WarehouseRoutesDetailComponent } from './components/warehouse-routes-detail/warehouse-routes-detail.component';
import { WarehouseRoutesComponent } from './components/warehouse-routes/warehouse-routes.component';
import { WarehouseRoutesaddComponent } from './components/warehouse-routesadd/warehouse-routesadd.component';
import { WarehouseAddComponent } from './components/warehouseadd/warehouseadd.component';
import { WarehousesComponent } from './components/warehouses/warehouses.component';

const routes: Routes = [ //Defines all the routes users can go to
  { path: '', redirectTo: '/trucks', pathMatch: 'full' },
  { path: 'deliveries', component: DeliveriesComponent },
  { path: 'delivery/create', component: DeliveryaddComponent },
  { path: 'delivery/:id', component: DeliveryDetailComponent },
  { path: 'trucks', component: TruckComponent },
  { path: 'truck/create', component: TruckAddComponent},
  { path: 'truck/:id', component: TruckDetailComponent },
  { path: 'warehouses', component: WarehousesComponent }, //Go to page that shows all the warehouses
  { path: 'warehouse/create', component: WarehouseAddComponent}, //Go to page to create a warehouse
  { path: 'warehouse/:id', component: WarehouseDetailComponent }, //Go to page that shows a specific warehouse with a form to edit the data
  { path: 'warehouse-routes', component: WarehouseRoutesComponent },
  { path: 'warehouse-route/create', component: WarehouseRoutesaddComponent },
  { path: 'warehouse-route/:id', component: WarehouseRoutesDetailComponent },
  { path: 'planning', component: PlanningComponent },
  { path: 'packages', component: PackagesComponent },
  { path: 'package/create', component: PackageaddComponent },
  { path: 'package/:id', component: PackageDetailComponent },
  { path: 'user/create', component: CreateuserComponent },
  { path: '**', redirectTo: '/trucks', pathMatch: 'full' }] //When no route is recognized, the users will be redirected to the trucks route.

@NgModule({
  imports: [RouterModule.forRoot(routes)], //Declares that this module should use the previously defined routes.
  exports: [RouterModule]
})
export class AppRoutingModule { }
