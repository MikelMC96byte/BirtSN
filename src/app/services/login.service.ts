import { Injectable } from "@angular/core";
import { Auth } from "../models/auth";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { FormBuilder } from "@angular/forms";

import { configuration } from "../models/configuration";

@Injectable()
export class AuthService {

    public url : string;

    private auth: Auth = {
        access_token: "",
        token_type: ""
    };

    constructor(public _http: HttpClient) {
        this.url = configuration.base_api_url + "auth/jsonLogin";
    }

    postAuth(data: any): Observable<any> {
        return this._http.post(this.url, data);
    }

}