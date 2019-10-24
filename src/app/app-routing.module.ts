import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { OrderConfirmComponent } from './place-order/order-confirm/order-confirm/order-confirm.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { SignInComponent } from './admin-view/sign-in/sign-in.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'place-order',
    component: PlaceOrderComponent
  },
  {
    path: 'view-order',
    component: ViewOrderComponent 
  },
  {
    path: 'order-confirm',
    component: OrderConfirmComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'admin-view',
    component: AdminViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
