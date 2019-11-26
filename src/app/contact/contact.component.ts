import { Component, OnInit } from '@angular/core';
// import { Http, Headers, Response, URLSearchParams } from '@angular/http';
// import 'rxjs/add/operator/toPromise';
import { NgForm } from '@angular/forms';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private http:HttpClient,private route:ActivatedRoute,
    private router:Router) {}
  ngOnInit() { }
  

  sendEmail(data:NgForm) {

    let url = 'https://us-central1-swolcrud.cloudfunctions.net/email';
    // let headers = new HttpHeaders(
    //   {'Content-Type': 'application/json',
    //    'Access-Control-Allow-Origin': '*' });
    let body = JSON.stringify({
      message: data.value.message,
      email: data.value.email,
      name: data.value.name
  });
     let params= new HttpParams().set('content', 'user@example.com');
    // params.set('from', 'you@yoursupercoolapp.cosm');
    // params.set('subject', 'test-email');
    // params.set('content', 'Hello World');

    this.http.post('https://us-central1-swolcrud.cloudfunctions.net/email', body
  //   {headers: new HttpHeaders({
      
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*'
  //   })
  // }
  ).subscribe(
    res => {
      alert(res.toLocaleString);
      data.reset();

    },
    err => {
      console.log("Error occured");
    }
  );

  }

}
