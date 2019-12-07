import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Order } from '../shared/order.model';
import { OrderService } from '../shared/order.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {
  orderDetails:any;
  allorderDetails:any;
  constructor(private firestore:AngularFirestore, private service:OrderService) { }

  ngOnInit() {
   

  }
  trackOrder(formData:NgForm){
    var from;
    var to;
  

    let results = document.getElementsByClassName('results') as HTMLCollectionOf<HTMLElement>;
    
    
    var docRef = this.firestore.collection('orders').doc(formData.value.orderNumberInput);

    docRef.get().toPromise().then((doc)=>{
      if(doc.exists){
       var node =document.getElementById("error");
       if(node.hasChildNodes())
        node.firstChild.remove();

        results[0].style.visibility = "visible";
        this.orderDetails = {...doc.data()};
        console.log(doc.data());
        console.log(this.orderDetails);
        document.getElementById('name').innerText = doc.data().name;
        document.getElementById('from').innerText = doc.data().from;
        document.getElementById('to').innerText = doc.data().to;
        document.getElementById('status').innerText = doc.data().status;

      }
      else{
        document.getElementById("error").innerHTML = "<div class='alert alert-danger' role='alert'> The order number you provided does not exist!!</div>";
        results[0].style.visibility = "hidden";
        console.log("does not exist");
      }
    }).catch(function(error){
      console.log("errrrrr",error);
    });


  
  }
}
