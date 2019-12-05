import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/order.model';
import { OrderService } from '../shared/order.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { triggerAsyncId } from 'async_hooks';
import { BindingFlags } from '@angular/compiler/src/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  
  constructor(private firestore:AngularFirestore, private service:OrderService,public authService: AuthService,private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    
    document.getElementById("logoutBtn").style.display = "inline-block";
   this.authService.isSignIn();  //used to redirect if user types url to admin view
  

var vm = this;
  this.firestore.collection("orders").get().toPromise().then(function(querySnapshot) {
querySnapshot.forEach(function(doc) {

vm.orderDetails.push(doc.data() );

});
});


  }
  ngOnDestroy() {
    document.getElementById("logoutBtn").style.display = "none";
  }
  

  onChange(selection, searchtype){
   
    let results = document.getElementsByClassName('results') as HTMLCollectionOf<HTMLElement>;
    results[0].style.visibility = "visible";
    var vm = this;
    this.firestore.collection("orders").get().toPromise().then(function(querySnapshot) {
        vm.orderDetails = [];
    querySnapshot.forEach(function(doc) {
   

    if(searchtype=='from' ){
      if(selection ==""){
        vm.flag.from=false;
      }
      else{
       vm.flag.from =true;
       vm.flag.fromvalue = selection;
      }
      }
      if(searchtype=='to'  ){
        if(selection ==""){
          vm.flag.to=false;
        }
        else{
        vm.flag.to =true;
        vm.flag.tovalue = selection;
      }
       }
    if(searchtype=='tier'){
      if(selection ==""){
        vm.flag.tier=false;
       
      }
      else{
      vm.flag.tier =true;
      vm.flag.tiervalue = selection;
      }
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
      if(vm.flag.from ==false && vm.flag.to ==false && vm.flag.tier == false ){
        // results[0].style.visibility = "hidden";
        vm.orderDetails.push(doc.data());
      }
      
   
    });
    
  
    
});

}

updateStatus(data:NgForm){
  console.log(data.value);
 this.firestore.collection("orders").doc(data.value.orderNumber).update({
   status: data.value.status
 })
 .then(()=>{
  var statusSectiion =document.getElementById("message");
  statusSectiion.insertAdjacentHTML("beforebegin", '<span style="margin-bottom:0px;" class="alert alert-success has-text-centered" role="alert">A simple success alert—check it out!</span>');
 });
}

trackOrder(formData:NgForm){  
  let results = document.getElementsByClassName('results') as HTMLCollectionOf<HTMLElement>;

  var docRef = this.firestore.collection('orders').doc(formData.value.orderNumberInput);
  var vm = this;
  this.orderDetails =[];
  docRef.get().toPromise().then((doc)=>{
    
    if(doc.exists){
      results[0].style.visibility = "visible";
     var node =document.getElementById("error");

     if(node.hasChildNodes())
      node.firstChild.remove();
  
    vm.orderDetails.push(doc.data() );
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
