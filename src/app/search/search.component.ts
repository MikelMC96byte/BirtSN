import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})
export class SearchComponent implements OnInit {

  public searchInput : string;
  public searchResults : Array<User>;

  constructor(private _searchService: SearchService, private _router: Router) { 
    this.searchInput = "";
    this.searchResults = new Array<User>();
  }

  ngOnInit(): void {
  }

  search() : void {
    this._searchService.search(this.searchInput).subscribe({
      next: (res) => {
        this.searchResults = res;
        console.log(this.searchResults);

      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  goToProfile(username: string) : void {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.navigate(['/users/' + username]);
  }

}
