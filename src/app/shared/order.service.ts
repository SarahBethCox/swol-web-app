import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
// import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})



export class OrderService {

  formData : Order;


  // vierOrderFormData:String;

  private orderDetails = new BehaviorSubject<any>({});
  currentOrderDetails = this.orderDetails.asObservable();
  
  constructor(private firestore:AngularFirestore) { }

  changeOrderDetails(details:any){
    this.orderDetails.next(details);
  }

  getOrderDetails(){
   return this.firestore.collection('orders').snapshotChanges();
 }


}
