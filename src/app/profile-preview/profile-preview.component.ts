import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-preview',
  templateUrl: './profile-preview.component.html',
  styleUrls: ['./profile-preview.component.css']
})
export class ProfilePreviewComponent implements OnInit {

  public username : any = localStorage.getItem('username');

  constructor(private _router : Router) { }

  ngOnInit(): void { }

  logout() : void {
    this._router.navigate(['/logout']);
  }

  showProfile() : void {
    this._router.navigate(['/users/' + this.username]);
  }
}
