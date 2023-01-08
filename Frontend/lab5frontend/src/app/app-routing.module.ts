import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { HomeContentComponent } from './components/home-content/home-content.component';
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
import { UsersComponent } from './components/users/users.component';
import { RolesComponent } from './components/roles/roles.component';
import { RoleCreateComponent } from './components/role-create/role-create.component';
import { UseraddComponent } from './components/useradd/useradd.component';

const routes: Routes = [
  {
    path: '',
    component: HomeContentComponent,
    pathMatch: 'full',
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  { path: 'deliveries', component: DeliveriesComponent,
  canActivate: [AuthGuard], },
  { path: 'delivery/create', component: DeliveryaddComponent,
  canActivate: [AuthGuard], },
  { path: 'delivery/:id', component: DeliveryDetailComponent,
  canActivate: [AuthGuard], },
  { path: 'trucks', component: TruckComponent,
  canActivate: [AuthGuard], },
  { path: 'truck/create', component: TruckAddComponent,
  canActivate: [AuthGuard],},
  { path: 'truck/:id', component: TruckDetailComponent,
  canActivate: [AuthGuard], },
  { path: 'warehouses', component: WarehousesComponent,
  canActivate: [AuthGuard], }, //Go to page that shows all the warehouses
  { path: 'warehouse/create', component: WarehouseAddComponent,
  canActivate: [AuthGuard],}, //Go to page to create a warehouse
  { path: 'warehouse/:id', component: WarehouseDetailComponent,
  canActivate: [AuthGuard], }, //Go to page that shows a specific warehouse with a form to edit the data
  { path: 'warehouse-routes', component: WarehouseRoutesComponent,
  canActivate: [AuthGuard], },
  { path: 'warehouse-route/create', component: WarehouseRoutesaddComponent,
  canActivate: [AuthGuard], },
  { path: 'warehouse-route/:id', component: WarehouseRoutesDetailComponent,
  canActivate: [AuthGuard], },
  { path: 'planning', component: PlanningComponent,
  canActivate: [AuthGuard], },
  { path: 'packages', component: PackagesComponent,
  canActivate: [AuthGuard], },
  { path: 'package/create', component: PackageaddComponent,
  canActivate: [AuthGuard], },
  { path: 'package/:id', component: PackageDetailComponent,
  canActivate: [AuthGuard], },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/create',
    component: UseraddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'roles',
    component: RolesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'role/create',
    component: RoleCreateComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
