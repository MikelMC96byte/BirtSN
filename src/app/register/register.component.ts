import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Login } from '../models/login';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  public registerData : Login;

  constructor(private _authService: AuthService) { 
    this.registerData = new Login("", "");
  }

  ngOnInit(): void {
  }

  register() : void {
    this._authService.register(this.registerData).subscribe({
      next: (res) => {
        console.log(res);
        Swal.fire({
          title: 'Registro correcto',
          text: `${res.username} se ha registrado correctamente`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          title: 'Error',
          text: `${err.error.detail}`,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
}
