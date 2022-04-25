import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
  providers: [UserService]
})
export class ProfileEditComponent implements OnInit {

  public loggedUsername : any = localStorage.getItem('username');
  public userInfo : User = new User(0, "", "", "");

  constructor(private _userService : UserService, private _router: Router) { }

  ngOnInit(): void {
    this._userService.read(this.loggedUsername).subscribe({
      next: (res) => {
        this.userInfo = res;
        console.log(this.userInfo);
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salió mal!',
        });
      }
    })
  }

  editProfile() : void {
    Swal.fire({
      icon: 'question',
      title: '¿Seguro que quieres editar tu perfil?',

      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          icon: 'success',
          title: '¡Editado!',
          text: 'Tu perfil ha sido editado con éxito.'
        }).then(() => {
          this._userService.update(this.userInfo).subscribe({
            next: (res) => {
              this._router.navigate(['/users/' + this.loggedUsername]);
            },
            error: (err) => {
              console.error(err);
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Algo salió mal!',
              }).then(() => {
                this._router.navigate(['/users/' + this.loggedUsername]);
              });
            }
          });
        });
      }else{
        this._router.navigate(['/users/' + this.loggedUsername]);
      }
    });
    
  }

  cancel() : void {
    this._router.navigate(['/users/' + this.loggedUsername]);
  }

}
