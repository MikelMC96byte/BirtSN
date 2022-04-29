import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Post } from '../models/post';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-post-full-view',
  templateUrl: './post-full-view.component.html',
  styleUrls: ['./post-full-view.component.css'],
  providers: [AuthService]
})
export class PostFullViewComponent implements OnInit {

  public id : number = 0;

  constructor(private _route: ActivatedRoute, private _router: Router, private _authService: AuthService) { }

  ngOnInit(): void {
    if(!this._authService.isLoggedIn()) {
      this._router.routeReuseStrategy.shouldReuseRoute = () => false;      
      this._router.navigate(['/login']);
    } else {
      this._route.params.subscribe(params => {
        this.id = params['id'];
      });
    }
  }

  deleteSelf(post : Post) : void {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.navigate(['/home']);
  }
}
