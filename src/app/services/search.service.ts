import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { BASE_API_URL } from "../config/config";

@Injectable()
export class SearchService {

    public url : string;

    constructor(public _http: HttpClient) {
        this.url = BASE_API_URL + "search";
    }

    public search(data: string) : Observable<any> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        console.log(headers);
        return this._http.get(this.url + "?q=" + data, { headers: headers });
    }
}