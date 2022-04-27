import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { BASE_API_URL } from "../config/config";
import { User } from "../models/user";

@Injectable()
export class UserService {

    public url : string;

    constructor(public _http: HttpClient) {
        this.url = BASE_API_URL + "users";
    }

    public readById(id: number) : Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        console.log(headers);
        return this._http.get(this.url + "/id/" + id, { headers: headers });
    }

    public read(username: string) : Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        console.log(headers);
        return this._http.get(this.url + "/" + username, { headers: headers });
    }

    public update(user: User) : Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        console.log(headers);
        return this._http.put(
            this.url, {
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
        return this._http.delete(this.url, { headers: headers });
    }
}