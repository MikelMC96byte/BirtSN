import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { BASE_API_URL } from "../config/config";
import { Comment, NewComment } from "../models/comment";

@Injectable()
export class CommentService {

    public postUrl : string;
    public commentUrl : string;

    constructor(public _http: HttpClient) {
        this.postUrl = BASE_API_URL + "posts";
        this.commentUrl = BASE_API_URL + "comments";
    }

    public create(id: number, comment: NewComment) : Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        return this._http.post(this.postUrl + "/" + id + "/comments", comment, { headers: headers });
    }

    public readByPost(id: number) : Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        return this._http.get(this.postUrl + "/" + id + "/comments", { headers: headers });
    }

    public read(id: number) : Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        return this._http.get(this.commentUrl + "/" + id, { headers: headers });
    }

    public update(comment: Comment) : Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        return this._http.put(this.commentUrl, comment, { headers: headers });
    }

    public delete(id: number) : Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        return this._http.delete(this.commentUrl + "/" + id, { headers: headers });
    }
}