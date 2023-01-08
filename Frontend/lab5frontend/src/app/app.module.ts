import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import json from 'highlight.js/lib/languages/json';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeContentComponent } from './components/home-content/home-content.component';
import { LoadingComponent } from './components/loading/loading.component';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { UsersComponent } from './components/users/users.component';
import { RolesComponent } from './components/roles/roles.component';
import { RoleCreateComponent } from './components/role-create/role-create.component';
import { UseraddComponent } from './components/useradd/useradd.component';

@NgModule({
  declarations: [
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
    PackageDetailComponent,
    HomeContentComponent,
    NavBarComponent,
    HomeContentComponent,
    LoadingComponent,
    ErrorComponent,
    NotfoundComponent,
    UsersComponent,
    RolesComponent,
    RoleCreateComponent,
    UseraddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    HighlightModule,
    FontAwesomeModule,
    AuthModule.forRoot({
      ...env.auth,
      httpInterceptor: {
        ...env.httpInterceptor,
      },
    }),
  ],
  providers: [
    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    {
      provide: Window,
      useValue: window,
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          json: () => import('highlight.js/lib/languages/json'),
        },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
