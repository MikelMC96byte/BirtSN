import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { BASE_API_URL } from "../config/config";
import { Post, NewPost } from "../models/post";

@Injectable()
export class PostService {

    public url : string;

    constructor(public _http: HttpClient) {
        this.url = BASE_API_URL + "posts";
    }

    public read(id: number) : Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        return this._http.get(this.url + "/" + id, { headers: headers });
    }

    public readAll() : Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        return this._http.get(this.url, { headers: headers });
    }

    public readByUser(username: string) : Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        return this._http.get(this.url + "/user/" + username, { headers: headers });
    }

    public create(post: NewPost) : Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        return this._http.post(this.url, post, { headers: headers });
    }

    public update(post: Post) : Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        return this._http.put(this.url, post, { headers: headers });
    }

    public delete(id: number) : Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        return this._http.delete(this.url + "/" + id, { headers: headers });
    }
}