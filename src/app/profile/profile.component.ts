import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [AuthService, UserService]
})
export class ProfileComponent implements OnInit {

  public loggedUsername : any = localStorage.getItem('username');
  public profileUsername : string = "";
  public userInfo : User = new User(0, "", "", "");

  constructor(
    private _router: Router, 
    private _authService : AuthService, 
    private _route: ActivatedRoute,
    private _userService : UserService
  ) { 
    
  }

  ngOnInit(): void {
    if(!this._authService.isLoggedIn()) {
      this._router.navigate(['/login']);
    }

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
    })
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
