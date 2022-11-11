import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TruckDetailComponent } from './components/truck-detail/truck-detail.component';
import { TruckComponent } from './components/truck/truck.component';
import { TruckAddComponent } from './components/truckadd/truckadd.component';
import { WarehouseDetailComponent } from './components/warehouse-detail/warehouse-detail.component';
import { WarehouseAddComponent } from './components/warehouseadd/warehouseadd.component';
import { WarehousesComponent } from './components/warehouses/warehouses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';

const routes: Routes = [
  { path: '', redirectTo: '/trucks', pathMatch: 'full' },
  { path: 'trucks', component: TruckComponent },
  { path: 'truck/create', component: TruckAddComponent},
  { path: 'truck/:id', component: TruckDetailComponent },
  { path: 'warehouses', component: WarehousesComponent },
  { path: 'warehouse/create', component: WarehouseAddComponent},
  { path: 'warehouse/:id', component: WarehouseDetailComponent },
  { path: '**', redirectTo: '/trucks', pathMatch: 'full' }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
