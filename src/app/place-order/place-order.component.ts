import { Component, OnInit } from '@angular/core';
// import * as moment from 'moment';
import { OrderService } from '../shared/order.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})





export class PlaceOrderComponent implements OnInit {
  name: string;
  shipFrom: string;
  shipTo: string;
  tier: string;

  orderDetails:any;
  


  constructor(private service:OrderService,
              private route:ActivatedRoute,
              private router:Router) { }

 
  ngOnInit() {  

    this.service.formData ={
      firstName: '',
      shippingFrom: '',
      shippingTo: '',
      tier: null
    };

  }



  processForm(orderForm: NgForm) {
    
    var service = new google.maps.DistanceMatrixService;
   
    service.getDistanceMatrix({
      origins: [orderForm.value.from],
      destinations: [orderForm.value.to],
      
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      avoidHighways: false,
      avoidTolls: false
    },function(res, status){
      if (status !== google.maps.DistanceMatrixStatus.OK) {
        alert('Error was: ' + status);
      } else {
        //console.log(res.rows[0].elements[0].distance.text);
        document.getElementById('distance').setAttribute('value', res.rows[0].elements[0].distance.text);
        
      }
    });
    

    this.service.shareOrderData(orderForm.value);
    this.router.navigate(['/order-confirm']);


  }
  
  selectChangeHandlerFrom (event: any) {
    this.shipFrom = event.target.value;
  }

  selectChangeHandlerTo (event: any) {
    this.shipTo = event.target.value;
  }
}
