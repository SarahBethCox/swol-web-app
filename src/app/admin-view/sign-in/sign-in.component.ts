import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

 

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.isSignIn();
  }

  login(values) {
    this.authService.login(values);
  }
  
}
