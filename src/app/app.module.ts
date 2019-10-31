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
import { AdminViewComponent } from './admin-view/admin-view.component';
import { SignInComponent } from './admin-view/sign-in/sign-in.component';


import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import { environment } from 'src/environments/environment';



import { OrderService } from './shared/order.service';
import { importType } from '@angular/compiler/src/output/output_ast';



 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    PlaceOrderComponent,
    ViewOrderComponent,
    OrderConfirmComponent,
    AdminViewComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaeConfig), //
    AngularFirestoreModule, //
    AppRoutingModule,
    FormsModule,
    CoreModule
  ],
  providers: [OrderService],//
  bootstrap: [AppComponent]
})
export class AppModule { }
