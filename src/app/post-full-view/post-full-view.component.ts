import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Post } from '../models/post';
import { AuthService } from '../services/auth.service';
import { Comment } from '../models/comment';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-post-full-view',
  templateUrl: './post-full-view.component.html',
  styleUrls: ['./post-full-view.component.css'],
  providers: [AuthService, CommentService]
})
export class PostFullViewComponent implements OnInit {

  public id : number = 0;
  public comments : Array<Comment> = new Array<Comment>();

  constructor(
    private _route: ActivatedRoute, 
    private _router: Router, 
    private _authService: AuthService,
    private _commentService : CommentService
  ) { }

  ngOnInit(): void {
    if(!this._authService.isLoggedIn()) {
      this._router.routeReuseStrategy.shouldReuseRoute = () => false;      
      this._router.navigate(['/login']);
    } else {
      this._route.params.subscribe(params => {
        this.id = params['id'];
        this._commentService.readByPost(this.id).subscribe({
          next: (res) => {
            this.comments = res;
          },
          error: (err) => {
            console.error(err);
          }
        })
      });
    }
  }

  deleteSelf(post : Post) : void {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.navigate(['/home']);
  }

  deleteComment(comment : Comment) : void {
    this.comments = this.comments.filter(c => c.id != comment.id);
  }
}
