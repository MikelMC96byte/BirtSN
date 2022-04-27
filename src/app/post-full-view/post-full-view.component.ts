import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-full-view',
  templateUrl: './post-full-view.component.html',
  styleUrls: ['./post-full-view.component.css']
})
export class PostFullViewComponent implements OnInit {

  public id : number = 0;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

}
