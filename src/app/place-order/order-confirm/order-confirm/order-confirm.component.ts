import { Component, OnInit} from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';


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
  
  constructor(private service:OrderService) {
     
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
  
  

  submitOrder(){
   
    
  }
  
}
