import { Component, OnInit} from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { AngularFirestore } from '@angular/fire/firestore';
// import undefined = require('firebase/empty-import');


@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.css']
})
export class OrderConfirmComponent implements OnInit {

  orderDetails:any;
  name:string;
  from:string;
  to:string
  tier:number;
  orderNumber:string;
  randNum:number;
  showOrderNumber:string;
  constructor(private service:OrderService,private firestore:AngularFirestore) {
     
  }

  ngOnInit() {
   this.service.currentOrderInfo.subscribe(
    (orderData)=>{
      this.orderDetails = Object.assign({}, orderData);
    }
   )


  
  this.name = this.orderDetails.name;
  this.from = this.orderDetails.from;
  this.to = this.orderDetails.to;
  this.tier = this.orderDetails.tierOption;
    // console.log(this.orderDetails);
  }
  
  createOrderNumber(){
    this.orderNumber='';
    
    for(var i=0; i<10; i++){
      this.randNum = Math.floor(Math.random() * 10) + 1;
      this.orderNumber = this.orderNumber + this.randNum.toString();
    }
    this.orderNumber = this.name.substring(0,1) + this.orderNumber + this.name.substring(0,1);
    
    return this.orderNumber;
  }
  
  

  submitOrder(){
   
    this.orderDetails.orderNumber = this.createOrderNumber();
    this.orderDetails.orderNumber = this.createOrderNumber();
    // if(this.firestore.collection('orders').add(this.orderDetails)){
    //   alert(this.orderDetails.name + " your order was stored");
    // }
    this.firestore.collection('orders').doc(this.orderDetails.orderNumber).set(this.orderDetails);

    alert("Your order number is " + this.orderDetails.orderNumber);
  }
  
  
}
