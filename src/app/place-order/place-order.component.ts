import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { Order } from '../shared/order.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']

})

export class PlaceOrderComponent implements OnInit {
  
  details:any;
  selectedShippingFrom: string ='';
  selectedShippingTo: string= "";
  distance:string ="";
  shippingFromSelection(event: any){
  this.selectedShippingFrom = event.target.value;
  }
  shippingToSelection(event: any){
    this.selectedShippingTo = event.target.value;
  }

  
  
  constructor(private service : OrderService,
              private firestore:AngularFirestore) { }

  ngOnInit() {
    this.resetForm();
    this.service.currentOrderDetails.subscribe(details=>this.details = details);
  }


  resetForm(form?: NgForm){

    if(form!=null)
      form.resetForm();

    this.service.formData={
      firstName: '',
      lastName: '',
      shippingFrom:'',
      shippingTo: '',
      tier: null,
    }
  }

  // onSubmit(form:NgForm){
   
  //   let data = form.value;
  //   data.shippingFrom = this.selectedShippingFrom;
  //   data.shippingTo = this.selectedShippingTo;
    
  //   this.resetForm(form);
    
  // }

  orderCheckout(form:NgForm) {
    let formData = form.value;
    var service = new google.maps.DistanceMatrixService;
   
    service.getDistanceMatrix({
      origins: [this.selectedShippingFrom],
      destinations: [this.selectedShippingTo],
      
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      avoidHighways: false,
      avoidTolls: false
    },function(res, status){
      if (status !== google.maps.DistanceMatrixStatus.OK) {
        alert('Error was: ' + status);
      } else {
        console.log(res.rows[0].elements[0].distance.text);
        document.getElementById('distance').innerText = res.rows[0].elements[0].distance.text;
        // alert(res.rows[0].elements[0].distance.text);
        
      }
    });
    
    this.details.firstName = formData.firstName;
    this.details.lastName = formData.lastName;
    this.details.shippingFrom = this.selectedShippingFrom;
    this.details.shippingTo = this.selectedShippingTo;
    this.details.tier = formData.tier;
     console.log("Jflkdjfl" +this.details.distance);

  }
}
