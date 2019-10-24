import { Component, OnInit} from '@angular/core';
import {OrderService} from "../../shared/order.service";
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.css']
})
export class OrderConfirmComponent implements OnInit {

  details:any;
  randNum: number;
  orderNumber: string;
  firstName:string;
  lastName:string;
  from:string;
  to:string
  tier:number;
  distance:string;
  
  
  constructor(private service: OrderService,private firestore:AngularFirestore) { }

  ngOnInit() {
    this.service.currentOrderDetails.subscribe(details=>this.details = details);
   this.firstName = this.details.firstName;
    this.lastName = this.details.lastName;
    this.from = this.details.shippingFrom;
    this.to = this.details.shippingTo;
    this.tier = this.details.tier;
    this.distance = this.details.distance;
  }


   createRand(){
    this.orderNumber='';
    
    for(var i=0; i<10; i++){
      this.randNum = Math.floor(Math.random() * 10) + 1;
      this.orderNumber = this.orderNumber + this.randNum.toString();
    }
    this.orderNumber = this.firstName.substring(0,1) + this.orderNumber + this.lastName.substring(0,1);
    
    return this.orderNumber;
  }


  submitOrder(){
    this.details.orderNumber = this.createRand();
    
   console.log(this.details);
  this.firestore.collection('orders').doc(this.details.orderNumber).set({
    firstName: this.details.firstName, lastName: this.details.lastName, shippingFrom:this.details.shippingFrom, shippingTo:this.details.shippingTo,tier:this.details.tier
  });
  

}
}
