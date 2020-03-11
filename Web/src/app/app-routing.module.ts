import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ReportComponent } from './components/report/report.component';
import { TrackingComponent } from './components/tracking/tracking.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { WarehouseConsoleComponent } from './components/warehouse-console/warehouse-console.component';
import { DeliveryConsoleComponent } from './components/delivery-console/delivery-console.component';


const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'report', component: ReportComponent },
  { path: 'tracking', component: TrackingComponent },
  { path: 'user-console', component: UserProfileComponent },
  { path: 'warehouse-console', component: WarehouseConsoleComponent },
  { path: 'delivery-console', component: DeliveryConsoleComponent },

  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  AboutComponent,
  HomeComponent,
  AdminComponent,
  LoginComponent,
  ProductsComponent,
  ProductDetailComponent,
  ReportComponent,
  TrackingComponent,
  PageNotFoundComponent
]
