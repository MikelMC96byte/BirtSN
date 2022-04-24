import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
  providers: [AuthService]
})
export class NavigationBarComponent implements OnInit {

  constructor(private _authService: AuthService) {
  }

  ngOnInit(): void {
  }

}
