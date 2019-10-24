import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore, docChanges } from '@angular/fire/firestore';
import { OrderService } from '../shared/order.service';
import { Order } from '../shared/order.model';
import { RouteReuseStrategy } from '@angular/router';


@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {


 
  
  orderDetails={};

  constructor(private firestore:AngularFirestore,
    private service:OrderService) { }

  ngOnInit() {
    // this.service.getOrderDetails().subscribe(actionArr=>{
    //   this.orderDetails = actionArr.map(item=>{
    //     return {...item.payload.doc.data()} as Order
    //   })

    // })

    // origins: ['Los Angeles'],
    //   destinations: ['New York'],
    
  }
 
  onSubmit(formData){



    var data = formData.orderNumber;
    var from;
    var to;
    var docRef = this.firestore.collection('orders').doc('G4945638128L');
    
    docRef.get().toPromise().then((doc)=>{
      if(doc.exists){
        this.orderDetails = {...doc.data()};
        console.log(doc.data());
        from = doc.data().shippingFrom;
        to = doc.data().shippingTo;
        
      }
      else{
        console.log("does not exist");
      }
    }).catch(function(error){
      console.log("errrrrr",error);
    });

   
    
    
  }





}
