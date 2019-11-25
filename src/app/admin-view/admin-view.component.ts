import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/order.model';
import { OrderService } from '../shared/order.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { triggerAsyncId } from 'async_hooks';
import { BindingFlags } from '@angular/compiler/src/core';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  orderDetails:any[] = [];
  orderDetailsTemp:any[] =[];
  distance:string;
  flag:any = {
    from:false,
    to:false, 
    tier:false,
    fromvalue:"", 
    tovalue:"", 
    tiervalue:""
  };
  
  constructor(private firestore:AngularFirestore, private service:OrderService) { }

  ngOnInit() {

  }
  trackOrder(formData:NgForm){
    
  
  }


  onChange(selection, searchtype){
    let results = document.getElementsByClassName('results') as HTMLCollectionOf<HTMLElement>;
    results[0].style.visibility = "visible";
    var vm = this;
    this.firestore.collection("orders").get().toPromise().then(function(querySnapshot) {
        vm.orderDetails = [];
    querySnapshot.forEach(function(doc) {
   

    if(searchtype=='from' ){
       vm.flag.from =true;
       vm.flag.fromvalue = selection;
      //  if(doc.data().from == selection){
      //   vm.orderDetails.push(doc.data());
       
      //  }
      }
      if(searchtype=='to'  ){
        vm.flag.to =true;
        vm.flag.tovalue = selection;
        // if(doc.data().to == selection){
         
        //  vm.orderDetails.push(doc.data());
        // }
       }
    if(searchtype=='tier'){
      vm.flag.tier =true;
      vm.flag.tiervalue = selection;
      //  if(doc.data().tierOption == selection){
        
      //   vm.orderDetails.push(doc.data());
      //  }
      }


      
      if(vm.flag.from ==true && vm.flag.to ==true && vm.flag.tier == true ){
        if(doc.data().from == vm.flag.fromvalue&& doc.data().to == vm.flag.tovalue &&doc.data().tierOption == vm.flag.tiervalue) 
        {
          vm.orderDetails.push(doc.data() );

        }  
      }
      if(vm.flag.from ==true && vm.flag.to ==true && vm.flag.tier == false){
        if(doc.data().from == vm.flag.fromvalue&& doc.data().to == vm.flag.tovalue) 
        {
          vm.orderDetails.push(doc.data());
      
        }  
      }
      if(vm.flag.from ==false && vm.flag.to ==true && vm.flag.tier == true){
        if(doc.data().to == vm.flag.tovalue &&doc.data().tierOption == vm.flag.tiervalue ) 
        {
          vm.orderDetails.push(doc.data());
        }  
      }
      if(vm.flag.from ==true && vm.flag.to ==false && vm.flag.tier == true){
        if(doc.data().from == vm.flag.fromvalue&&doc.data().tierOption == vm.flag.tiervalue) 
        {
          vm.orderDetails.push(doc.data() );
        }  
      }

      if(vm.flag.from ==true && vm.flag.to ==false && vm.flag.tier == false){
        if(doc.data().from == vm.flag.fromvalue) 
        {
          vm.orderDetails.push(doc.data());
        }  
      }
      if(vm.flag.from ==false && vm.flag.to ==false && vm.flag.tier == true){
       
        if(doc.data().tierOption == vm.flag.tiervalue) 
        {
          vm.orderDetails.push(doc.data());
        }  
      }
      if(vm.flag.from ==false && vm.flag.to ==true && vm.flag.tier == false){
       
        if(doc.data().to == vm.flag.tovalue) 
        {
          vm.orderDetails.push(doc.data());
        }  
      }
      
   
    });
    
  
    
});

  }
}
