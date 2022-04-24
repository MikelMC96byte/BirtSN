import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { BASE_API_URL } from "../config/config";

@Injectable()
export class UserService {

    public url : string;

    constructor(public _http: HttpClient) {
        this.url = BASE_API_URL;
    }

    public read(username: string) : Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        console.log(headers);
        return this._http.get(this.url + "users/" + username, { headers: headers });
    }

    public update() : Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        console.log(headers);
        return this._http.put(this.url + "me", { headers: headers });
    }

    public delete() : Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        console.log(headers);
        return this._http.delete(this.url + "me", { headers: headers });
    }
}