import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

import { BASE_API_URL } from "../config/config";
import { Login } from "../models/login";

@Injectable()
export class AuthService {

    public url : string;

    constructor(public _http: HttpClient, public _router: Router) {
        this.url = BASE_API_URL + "auth/";
    }

    public login(data: Login) : Observable<any> {
        return this._http.post(this.url + "jsonLogin", data);
    }

    public logout() : void {
        localStorage.removeItem('token');
        localStorage.removeItem('token_type');
        localStorage.removeItem('username');
        this._router.navigate(['/login']);
    }

    public register(data: Login): Observable<any> {
        return this._http.post(this.url + "register", data);
    }

    public isLoggedIn(): boolean {
        return localStorage.getItem('token') != undefined && localStorage.getItem('token') != null && localStorage.getItem('token') != "";
    }
}