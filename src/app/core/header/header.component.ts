import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService,private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
  }
  logout() {
     this.authService.logout();
     this.router.navigate(['/sign-in']);
  }
}
