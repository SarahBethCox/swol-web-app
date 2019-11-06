import { Injectable } from '@angular/core';
import { Order } from './order.model';
import {BehaviorSubject} from 'rxjs';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  formData: Order;

  private orderInfo = new BehaviorSubject<any>({});
  public currentOrderInfo = this.orderInfo.asObservable();

  shareOrderData(details: any){
    this.orderInfo.next(details);
  }

 

  constructor(private firestore:AngularFirestore) { }

 

}
