import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Comment, NewComment } from '../models/comment';
import { Post } from '../models/post';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { CommentService } from '../services/comment.service';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [AuthService, PostService, UserService, CommentService]
})
export class PostComponent implements OnInit {

  public loggedUsername : any = localStorage.getItem('username');
  @Input() postId : number = 0;
  @Output() deletedPost: EventEmitter<Post> = new EventEmitter<Post>();
  @Output() newComment: EventEmitter<Comment> = new EventEmitter<Comment>();
  public postData : Post = new Post(0, "", "", 0);
  public postUser : User|null = new User(0, "", "", "");
  public newCommentStatus : boolean = false;
  public comment : NewComment = new NewComment("", null);

  constructor(
    private _authService: AuthService, 
    private _router: Router, 
    private _postService : PostService,
    private _userService : UserService,
    private _commentService : CommentService,
  ) { }

  ngOnInit(): void {
    if(!this._authService.isLoggedIn()) {
      this._router.routeReuseStrategy.shouldReuseRoute = () => false;
      this._router.navigate(['/login']);
    } else {
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
  }

  openFullPost() : void {
    this._router.navigate(['/posts/' + this.postId]);
  }

  openUserProfile() : void {
    if(this.postUser != null) {
      this._router.routeReuseStrategy.shouldReuseRoute = () => false;
      this._router.navigate(['/users/' + this.postUser.username]);
    }
  }

  editPost() : void {
    this._router.navigate(['/posts/' + this.postData.id + '/edit']);
  }

  deletePost() : void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this._postService.delete(this.postId).subscribe({
          next: (res) => {
            this.deletedPost.emit(this.postData);
            console.log(res);
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    });
  }

  showNewComment() : void {
    this.newCommentStatus = true;
  }

  createComment() : void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this._commentService.create(this.postId, this.comment).subscribe({
          next: (res) => {
            this.newComment.emit(res);
            console.log(res);
          },
          error: (err) => {
            console.error(err);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo crear el comentario',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          },
          complete: () => {
            this.cancelNewComment();
          }
        });
      }
    });
  }

  cancelNewComment() : void {
    this.newCommentStatus = false;
    this.comment = new NewComment("", null);
  }
}
