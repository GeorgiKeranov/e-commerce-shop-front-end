import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Role } from '../../objects/role';
import { User } from '../../objects/user';
import { Message } from '../../objects/message';
import { AuthenticationService } from '../authentication.service';

const hostUrl = 'http://localhost:8080';
const loginUrl = hostUrl + '/login';
const registerUrl = hostUrl + '/register';
const userDetailsUrl = hostUrl + '/user';

@Injectable()
export class UserService {

  constructor(
    private http: Http,
    private authService: AuthenticationService
  ) { }

  login(username: string, password: string): Promise<void> {

    const params = {
      'username': username,
      'password': password
    };

    return this.http.post(loginUrl, params).toPromise()
      .then(tokenResp => {
        tokenResp = tokenResp.json();

        this.authService.setToken(tokenResp['token']);

        // Getting the authenticated user details.
        this.getUserDetails()
          .then((user: User) => {

            let greaterRole = 'ROLE_USER';

            for (let i = 0; i < user.roles.length; i++) {
              if (user.roles[i].name === 'ROLE_ADMIN') {
                greaterRole = user.roles[i].name;
              }
            }

            user.role = greaterRole;

            this.saveUserDetails(user);

          });
      });
  }

  register(user): Promise<Message> {

    return this.http.post(registerUrl, user).toPromise()
      .then(resp => resp.json() as Message)
      .catch(err => err.json() as Message);
  }

  getUserDetails(): Promise<User> {
    return this.http.get(userDetailsUrl, this.authService.getRequestOptions())
      .toPromise()
      .then(response => response.json() as User);
  }

  saveUserDetails(user: User) {
    localStorage.setItem('username', user.username);
    localStorage.setItem('address', user.address);
    localStorage.setItem('country', user.country);
    localStorage.setItem('email', user.email);
    localStorage.setItem('firstName', user.firstName);
    localStorage.setItem('lastName', user.lastName);
    localStorage.setItem('phone', user.phone);
    localStorage.setItem('role', user.role);
  }

  removeUserDetails() {
    localStorage.removeItem('username');
    localStorage.removeItem('address');
    localStorage.removeItem('country');
    localStorage.removeItem('email');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('phone');
    localStorage.removeItem('role');
  }
}
