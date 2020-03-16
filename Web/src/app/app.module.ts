import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './shared/services/auth.service';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { WarehouseConsoleComponent } from './components/warehouse-console/warehouse-console.component';
import { DeliveryConsoleComponent } from './components/delivery-console/delivery-console.component';
import { KeysPipe } from './components/admin/keys.pipe';
import { AdminComponent } from './components/admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    UserProfileComponent,
    WarehouseConsoleComponent,
    DeliveryConsoleComponent,
    KeysPipe,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [
    AppComponent,
    AdminComponent,
  ]
})
export class AppModule { }
