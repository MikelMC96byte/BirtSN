import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthService]
})
export class HomeComponent implements OnInit {

  constructor(private _authService : AuthService, private _router: Router) { }

  ngOnInit(): void {
    if(!this._authService.isLoggedIn()) {
      this._router.navigate(['/login']);
    }
  }

}
