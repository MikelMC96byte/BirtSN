import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('username');
    this._router.navigate(['/login']);
  }

}
