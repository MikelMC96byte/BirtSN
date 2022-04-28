import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { PostService } from '../services/post.service';
import { Post } from '../models/post';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [AuthService, UserService, PostService]
})
export class ProfileComponent implements OnInit {

  public loggedUsername : any = localStorage.getItem('username');
  public profileUsername : string = "";
  public userInfo : User = new User(0, "", "", "");
  public posts : Array<Post> = [];

  constructor(
    private _router: Router, 
    private _authService : AuthService, 
    private _route: ActivatedRoute,
    private _userService : UserService,
    private _postService : PostService
  ) { }

  ngOnInit(): void {
    if(!this._authService.isLoggedIn()) {
      this._router.navigate(['/login']);
    } else {
      this._route.params.subscribe(params => {
        this.profileUsername = params['username'];
      });
  
      this._userService.read(this.profileUsername).subscribe({
        next: (res) => {
          this.userInfo = res;
          console.log(this.userInfo);
        },
        error: (err) => {
          console.error(err);
        }
      });
  
      this._postService.readByUser(this.profileUsername).subscribe({
        next: (res) => {
          this.posts = res;
          console.log(this.posts);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  editProfile() : void {
    this._router.navigate(['/users/' + this.loggedUsername + '/edit']);
  }

  logout() : void {
    this._authService.logout();
  }

  deleteAccount() : void{
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar!'

    }).then((result) => {
      if (result.value) {
        this._userService.delete().subscribe({
          next: (res) => {
            console.log(res);
            Swal.fire(
              '¡Borrado!',
              'Tu cuenta ha sido borrada.',
              'success'
            ).then(() => {
              this._authService.logout();
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
    });
  }

  deletePost(post : Post) : void {
    this.posts = this.posts.filter(p => p.id !== post.id);
  }
}
