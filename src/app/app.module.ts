import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { CoreModule } from './core/core.module';
import { fromEvent } from 'rxjs';
import { OrderConfirmComponent } from './place-order/order-confirm/order-confirm.component';
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import { environment } from 'src/environments/environment';
import { OrderService } from './shared/order.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    PlaceOrderComponent,
    ViewOrderComponent,
    OrderConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
 