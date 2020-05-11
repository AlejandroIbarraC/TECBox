import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { CartProductComponent } from './components/cartProduct/cartProduct.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ReportComponent } from './components/report/report.component';
import { TrackingComponent } from './components/tracking/tracking.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { WarehouseConsoleComponent } from './components/warehouse-console/warehouse-console.component';
import { DeliveryConsoleComponent } from './components/delivery-console/delivery-console.component';
import { CartComponent } from './components/cart/cart.component';
import { SecureInnerPagesGuard } from './shared/guard/secure-inner-pages.guard';
import { AuthGuard } from './shared/guard/auth.guard';
import { ModifyBranchComponent } from './components/modify-branch/modify-branch.component';
import { ModifyEmployeeComponent } from './components/modify-employee/modify-employee.component';
import { ModifyProductComponent } from './components/modify-product/modify-product.component';
import { ModifyRouteComponent } from './components/modify-route/modify-route.component';
import { ModifySellerComponent } from './components/modify-seller/modify-seller.component';
import { ModifyWorkerComponent } from './components/modify-worker/modify-worker.component';
import { WarehouseModifyComponent } from './components/warehouse-modify/warehouse-modify.component';


const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'report', component: ReportComponent },
  { path: 'tracking', component: TrackingComponent },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  { path: 'warehouse-console', component: WarehouseConsoleComponent },
  { path: 'delivery-console', component: DeliveryConsoleComponent },
  { path: 'cart', component: CartComponent },
  { path: 'cartProduct', component: CartProductComponent },
  { path: 'modify-branch', component: ModifyBranchComponent },
  { path: 'modify-employee', component: ModifyEmployeeComponent },
  { path: 'modify-product', component: ModifyProductComponent },
  { path: 'modify-route', component: ModifyRouteComponent },
  { path: 'modify-seller', component: ModifySellerComponent },
  { path: 'modify-worker', component: ModifyWorkerComponent },
  { path: 'warehouse-modify', component: WarehouseModifyComponent },

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
  PageNotFoundComponent,
  UserProfileComponent,
  WarehouseConsoleComponent,
  DeliveryConsoleComponent,
  ModifyBranchComponent,
  ModifyEmployeeComponent,
  ModifyProductComponent,
  ModifyRouteComponent,
  ModifySellerComponent,
  ModifyWorkerComponent
]
