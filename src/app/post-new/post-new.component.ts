import { Component, OnInit } from '@angular/core';
import { NewPost, Post } from '../models/post';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [AuthService, PostService]
})
export class PostNewComponent implements OnInit {

  public post : Post = new Post(0, "", "", 0);
  public currentUsername : any = localStorage.getItem('username');

  constructor(
    private _authService : AuthService,
    private _postService : PostService,
    private _router : Router
  ) { }

  ngOnInit(): void {
    if(!this._authService.isLoggedIn()) {
      this._router.routeReuseStrategy.shouldReuseRoute = () => false;      
      this._router.navigate(['/login']);
    }
  }

  public createPost() : void {
    let newPost : NewPost = new NewPost(this.post.header, this.post.body, this.currentUsername);
    this._postService.create(newPost).subscribe({
      next: (res) => {
        console.log(res);
        Swal.fire({
          title: 'Post creado',
          text: 'El post ha sido creado con éxito.',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) => {
          this._router.navigate(['/users', this.currentUsername]);
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
  }

  public cancel() : void {
    this._router.navigate(['/home']);
  }
}
