import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { BASE_API_URL } from "../config/config";
import { Post } from "../models/post";

@Injectable()
export class PostService {

    public url : string;

    constructor(public _http: HttpClient) {
        this.url = BASE_API_URL;
    }

    public read(id: number) : Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        return this._http.get(this.url + "posts/" + id, { headers: headers });
    }

    public readAll() : Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        return this._http.get(this.url + "posts", { headers: headers });
    }

    /*
    public update(user: User) : Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        console.log(headers);
        return this._http.put(
            this.url + "me", {
                username: user.username,
                name: user.name,
                birthday: user.birthday
            }, 
            { headers: headers }
        );
    }

    public delete() : Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        console.log(headers);
        return this._http.delete(this.url + "me", { headers: headers });
    }

    */
}