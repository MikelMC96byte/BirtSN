import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Post } from '../models/post';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthService, PostService]
})
export class HomeComponent implements OnInit {

  public postList : Array<Post> = new Array<Post>();

  constructor(private _authService : AuthService, private _router: Router, private _postService : PostService) { }

  ngOnInit(): void {
    if(!this._authService.isLoggedIn()) {
      this._router.navigate(['/login']);
    }

    this._postService.readAll().subscribe({
      next: (res) => {
        this.postList = res;
        console.log(this.postList);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Parece que estamos teniendo problemas. Por favor, inténtelo de nuevo más tarde.',
        });
        console.error(err);
      }
    });
  }

}
