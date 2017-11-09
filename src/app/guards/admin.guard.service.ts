import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CanActivate, Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { User } from '../objects/user';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) { }

    canActivate() {
        if (this.authService.loggedIn()) {

            const authenticatedUserRole = localStorage.getItem('role');
            if (authenticatedUserRole === 'ROLE_ADMIN') {
                return true;
            } else {
                this.router.navigate(['/']);
                return false;
            }

        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }

}
