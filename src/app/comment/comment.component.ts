import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Comment, NewComment } from '../models/comment';
import { CommentService } from '../services/comment.service';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  providers: [CommentService, AuthService, UserService]
})
export class CommentComponent implements OnInit {

  @Input() commentId: number = 0;
  @Output() deletedComment: EventEmitter<Comment> = new EventEmitter<Comment>();
  public commentData : Comment = new Comment(0, "", 0, 0, null)
  public commentUser : User|null = null;
  public loggedUsername : any = localStorage.getItem('username');
  public edittingComment : boolean = false;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _commentService: CommentService,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    if(!this._authService.isLoggedIn()) {
      this._router.routeReuseStrategy.shouldReuseRoute = () => false;
      this._router.navigate(['/login']);
    } else {
      this._commentService.read(this.commentId).subscribe({
        next: (res) => {
          this.commentData = res;
          this._userService.readById(this.commentData.user_id).subscribe({
            next: (res) => {
              this.commentUser = res;
            },
            error: (err) => {
              console.error(err);
            }
          })
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Algo fue mal! Vuelve a intentarlo más tarde.'
          }).then((result) => {
            this._router.navigate(['/home']);
          });
          console.error(err);
        }
      })
    }
  }

  openUserProfile() : void {
    if(this.commentUser != null) {
      this._router.routeReuseStrategy.shouldReuseRoute = () => false;
      this._router.navigate(['/users/' + this.commentUser.username]);
    }
  }

  editComment() : void {
    this.edittingComment = true;
  }

  update() : void {
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
      if(result.value) {
        this._commentService.update(this.commentData).subscribe({
          next: (res) => {
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: '¡Listo!',
              text: '¡Tu comentario ha sido actualizado!'
            });
          },
          error: (err) => {
            console.error(err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: '¡Algo fue mal! Vuelve a intentarlo más tarde.'
            }).then((result) => {
              this._router.navigate(['/home']);
            });
          },
          complete: () => {
            this.edittingComment = false;
          }
        })
      }
    });
  }

  deleteComment() : void {
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
      if(result.value) {
        this._commentService.delete(this.commentData.id).subscribe({
          next: (res) => {
            console.log(res);
            Swal.fire({
              icon: 'success',
              title: '¡Listo!',
              text: '¡Tu comentario ha sido eliminado!'
            }).then((result) => {
              this.deletedComment.emit(this.commentData);
            });
          },
          error: (err) => {
            console.error(err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: '¡Algo fue mal! Vuelve a intentarlo más tarde.'
            }).then((result) => {
              this._router.navigate(['/home']);
            });
          }
        })
      }
    });
  }

  cancel() : void {
    this.edittingComment = false;
  }
}
