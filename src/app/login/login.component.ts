import { Component, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { Login } from '../models/login';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import jwt_decode from '../../../node_modules/jwt-decode';
import {currentRoute} from '../config/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  public loginData : Login;
  public route: string = currentRoute;

  constructor(private _router: Router , private _authService: AuthService) {
    this.loginData = new Login("", "");
  }

  ngOnInit(): void {
    this.route = this._router.url;
  }

  login() : void {
    console.log(this.loginData);
    this._authService.login(this.loginData).subscribe({
      next: (res) => {
        console.log(res);
        let decodedToken:any = jwt_decode(res.access_token);
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('token_type', res.token_type);
        localStorage.setItem('username', decodedToken.sub);
        this._router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          title: 'Error',
          text: `Usuario o contraseña incorrectos`,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

}
