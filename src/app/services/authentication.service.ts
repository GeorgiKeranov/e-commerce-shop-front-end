import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from '../objects/user';
import { tokenNotExpired } from 'angular2-jwt';

const hostUrl = 'http://localhost:8080';
const getAuthUserUrl: string = hostUrl + '/user';

@Injectable()
export class AuthenticationService {

    private authenticatedUser: User;

    constructor(
        private http: Http
    ) { }

    setToken(token: string) {
        localStorage.setItem('token', token);
    }

    deleteToken() {
        localStorage.removeItem('token');
    }

    loggedIn() {
        return tokenNotExpired();
    }

    setUser(user: User) {
        this.authenticatedUser = user;
    }

    getUser() {
        return this.authenticatedUser;
    }

    deleteUser() {
        this.authenticatedUser = null;
    }

    getRequestOptions() {
        return new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            })
        });
    }

    // These options are for the requests with FormData.
    // So here we are not setting content-type.
    getRequestOptionsFormData() {
        return new RequestOptions({
            headers: new Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            })
        });
    }
}
