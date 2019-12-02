import { Component, OnInit} from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';


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
  distance:number;
  orderNumber:string;
  randNum:number;
  showOrderNumber:string;
  tierOnePrice = 10;
  tierTwoPrice = 20;
  tierThreePrice = 30;
  tierFourPrice = 40;

  constructor(private service:OrderService,private firestore:AngularFirestore,private route:ActivatedRoute,
    private router:Router) {
     
  }

  ngOnInit() {
    this.service.currentOrderInfo.subscribe(
      (orderData)=>{
        this.orderDetails = Object.assign({}, orderData);
      });
      // console.log("order-Confirm");
      // console.log(this.orderDetails.distance);
      this.name = this.orderDetails.name;
      this.from = this.orderDetails.from;
      this.to = this.orderDetails.to;
      this.tier = this.orderDetails.tierOption;
      if(this.name == undefined){
        this.router.navigate(['/place-order']);
      }
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
    this.showOrderNumber = this.orderDetails.orderNumber;
    // this.orderDetails.orderNumber = this.createOrderNumber();
    this.orderDetails.distance =  (<HTMLInputElement>document.getElementById('distance')).value;
    this.orderDetails.tierPrice =  (<HTMLInputElement>document.getElementById('tierPrice')).value;
    this.orderDetails.tax =  (<HTMLInputElement>document.getElementById('tax')).value;
    this.orderDetails.total = (<HTMLInputElement>document.getElementById('total')).value;
    console.log(this.orderDetails);

    // if(this.firestore.collection('orders').add(this.orderDetails)){
    //   alert(this.orderDetails.name + " your order was stored");
    // }
    
    this.firestore.collection('orders').doc(this.orderDetails.orderNumber).set(this.orderDetails)
    .then(function() {
      document.getElementById("openModalButton").click();
      // this.router.navigate(['/home']);
      })
    .catch(function(error) {
        alert("Error writing document: "+ error);
    });
  

    // alert("Your order number is " + this.orderDetails.orderNumber);
  }
  cancelOrder(){
 
    if (confirm("Are you sure you want to cancel your order? ")) {
      this.router.navigate(['/place-order']);
  } else {
     
  }
  }
  toHome(){
    this.router.navigate(['']);
  }
  
  
}
