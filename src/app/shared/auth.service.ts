import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { ActivatedRoute, Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})


export class AuthService {
  constructor(public afAuth: AngularFireAuth,private route:ActivatedRoute,
    private router:Router) {     
  } 

  login(value) {
    this.afAuth
      .auth
      .signInWithEmailAndPassword(value.email, value.password)
      .then(value => {

        this.router.navigate(['/admin-view']);

        // console.log('Nice, it worked!,');
      })
      .catch(err => {
        document.getElementById("error").innerHTML = '<div class="alert alert-danger" role="alert">The username or password is incorrect!</div>';
        // console.log('Something went wrong:',err.message);
      });


  }

  logout() {
    this.afAuth
      .auth
      .signOut()
      
  }

  isSignIn(){
  var vm= this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
         vm.router.navigate(['/admin-view']);
      } else {
         vm.router.navigate(['/sign-in']);
      }
    });

  }
}
// contact.swoladm@gmail.com