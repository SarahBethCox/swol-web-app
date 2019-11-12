import { Component, OnInit } from '@angular/core';
// import * as moment from 'moment';
import { OrderService } from '../shared/order.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { type } from 'os';
import { BrowserStack } from 'protractor/built/driverProviders';


@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  orderDetails:any;
  name: string;
  shipFrom: string;
  shipTo: string;
  tier: string;
  
  tierOnePrice = 10;
  tierTwoPrice = 20;
  tierThreePrice = 25;
  tierFourPrice = 100;
  tax = .064;
  distance:number;

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
   getTierCost(tierSelected:number, distance:number){
     var tierPrice;
    console.log(tierSelected);
    // console.log(typeof(tierSelected));
     console.log(distance);

    switch(tierSelected){
      case 1: 
      tierPrice = 500+(distance*this.tierOnePrice).toString();
      break;
      case 2: 
      tierPrice =1500+(distance*this.tierTwoPrice).toString();
      break;
      case 3: 
      tierPrice = 5000+(distance*this.tierThreePrice).toString();
      break;
      case 4: 
      tierPrice = 9500+(distance*this.tierFourPrice).toString();
      break;

      default: 
      tierPrice = "error";
    }
    
     return tierPrice;
  }
  
  processForm(orderForm: NgForm) {
    // console.log(orderForm.value);
    var vm = this;
    var distance;
    var orderDetails = Object.assign({}, orderForm.value);
    var service = new google.maps.DistanceMatrixService;
    var price;
    var str;
    var temp;
    var temp2;


    service.getDistanceMatrix({
      origins: [orderForm.value.from],
      destinations: [orderForm.value.to],
      
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      avoidHighways: false,
      avoidTolls: false
    },callback);
    
    function callback(res, status){
      if (status !== google.maps.DistanceMatrixStatus.OK) {
        alert('Error was: ' + status);
      } else {
       
        distance =  res.rows[0].elements[0].distance.text;
        document.getElementById('distance').setAttribute('value', res.rows[0].elements[0].distance.text);
        
         distance = distance.substring(0, distance.length-2);
         str = distance.indexOf(",");
         temp = distance.substring(0,str);
         temp2 = distance.substring(str+1,distance.length);
         distance = temp + temp2;
         
      //  vm.distance = Number(document.getElementById('distance').getAttribute('value'));
         document.getElementById('tierPrice').setAttribute('value',vm.getTierCost(Number(orderDetails.tierOption),Number(distance))); 
         document.getElementById('tax').setAttribute('value',Number(vm.getTierCost(Number(orderDetails.tierOption),Number(distance))*vm.tax).toString()); 
         document.getElementById('total').setAttribute('value',(Number(vm.getTierCost(Number(orderDetails.tierOption),Number(distance))) + Number(vm.getTierCost(Number(orderDetails.tierOption),Number(distance))*vm.tax)).toString()); 

        }
    }
   
    this.service.shareOrderData(orderForm.value);
    this.router.navigate(['/order-confirm']);

    // const allInfo = `My name is ${this.name}. I'm shipping from ${this.shipFrom}. I'm shipping to ${this.shipTo}. My tier is ${this.tier}.`;
    // alert(allInfo);
  }

  selectChangeHandlerFrom (event: any) {
    this.shipFrom = event.target.value;
  }

  selectChangeHandlerTo (event: any) {
    this.shipTo = event.target.value;
  }
}
