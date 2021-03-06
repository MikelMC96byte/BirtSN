import { Component, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { Login } from '../models/login';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import jwt_decode from '../../../node_modules/jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  public loginData : Login;

  constructor(private _router: Router , private _authService: AuthService) {
    this.loginData = new Login("", "");
  }

  ngOnInit(): void {
    if(this._authService.isLoggedIn()) {
      this._router.navigate(['/home']);
    }
  }

  login() : void {
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
          text: err.error.detail == "Disabled user" ? "El usuario está deshabilitado" : "Usuario o contraseña incorrectos",
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

}
