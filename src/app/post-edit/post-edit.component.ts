import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
  providers: [AuthService, PostService]
})
export class PostEditComponent implements OnInit {

  public post : Post = new Post(0, "", "", 0);

  constructor(
    private _authService: AuthService, 
    private _postService: PostService, 
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if(!this._authService.isLoggedIn()) {
      this._router.routeReuseStrategy.shouldReuseRoute = () => false;      
      this._router.navigate(['/login']);
    } else {
      let id : number = 0;
      this._route.params.subscribe(params => {
        id = params['id'];
      });
      this._postService.read(id).subscribe({
        next: (res) => {
          this.post = res;
          console.log(this.post);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  update() : void {
    Swal.fire({
      title: 'Actualizar',
      text: `¿Está seguro de actualizar el post "${this.post.header}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if(result.value) {
        this._postService.update(this.post).subscribe({
          next: (res) => {
            Swal.fire({
              title: 'Actualizado',
              text: 'El post ha sido actualizado con éxito.',
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then((result) => {
              this._router.navigate(['/home']);
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Parece que estamos teniendo problemas. Por favor, inténtelo de nuevo más tarde.',
            }).then((result) => {
              this._router.navigate(['/home']);
            });
            console.error(err);
          }
        });
      } else {
        this.cancel();
      }
    });
  }

  cancel() : void {
    this._router.navigate(['/home']);
  }
}
