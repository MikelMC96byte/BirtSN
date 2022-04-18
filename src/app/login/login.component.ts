import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private cookie_token: string = "";
  private cookie_username: string = "";

  constructor(private cookieService: CookieService) {
  }

  ngOnInit(): void {
  }

  setCookie() {
    this.cookieService.set('token', this.cookie_token);
    this.cookieService.set('username', this.cookie_username);
  }

  login(username: string, password: string) {

  }

}
