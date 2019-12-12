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

    let body = JSON.stringify({
      message: data.value.message,
      email: data.value.email,
      name: data.value.name
  });


    this.http.post('https://us-central1-swol-3ea3a.cloudfunctions.net/email', body).subscribe(
    res => {
      document.getElementById("openModalButton").click();
      data.reset();

    },
    err => {
      console.log("Error occured");
    }
  );

  }

}
