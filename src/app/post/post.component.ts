import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../models/post';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [AuthService, PostService, UserService]
})
export class PostComponent implements OnInit {

  public loggedUsername : any = localStorage.getItem('username');
  @Input() postId : number = 0;
  public postData : Post = new Post(0, "", "", 0);
  public postUser : User|null = new User(0, "", "", "");

  constructor(
    private _authService: AuthService, 
    private _router: Router, 
    private _postService : PostService,
    private _userService : UserService
  ) { }

  ngOnInit(): void {
    this._postService.read(this.postId).subscribe({
      next: (res) => {
        this.postData = res;
        console.log(this.postData);
        this._userService.readById(this.postData.user_id).subscribe({
          next: (res) => {
            this.postUser = res;
            console.log(this.postUser);
          },
          error: (err) => {
            this.postUser = null;
            console.error(err);
          }
        })
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  userIsNull() : boolean {
    return this.postUser == null;
  }
}
