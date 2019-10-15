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
import { OrderConfirmComponent } from './place-order/order-confirm/order-confirm/order-confirm.component';

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
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
