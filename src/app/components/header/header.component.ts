import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from '../../services/user/user.service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css'],
    providers: [UserService]
})
export class HeaderComponent implements OnInit {

    constructor(
        private authService: AuthenticationService,
        private flashMessagesService: FlashMessagesService,
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    onLogout() {
        this.authService.deleteToken();
        this.userService.removeUserDetails();

        this.router.navigate(['/']);
        this.flashMessagesService.show('You are logged out!', { cssClass: 'alert-info' });
    }

    isAuthenticatedUserAdmin(): boolean {
        if (localStorage.getItem('role') === 'ROLE_ADMIN') {
            return true;
        } else {
            return false;
        }
    }

}