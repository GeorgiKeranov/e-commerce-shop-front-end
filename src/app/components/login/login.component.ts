import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../services/user/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { OrderService } from '../../services/order/order.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    providers: [UserService, OrderService]
})
export class LoginComponent {

    loginForm: FormGroup;

    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder,
        private flashMessagesService: FlashMessagesService,
        private router: Router,
        private orderService: OrderService
    ) {
        // Creating the login form.
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onLoginSubmit() {
        const username: string = this.loginForm.controls.username.value;
        const password: string = this.loginForm.controls.password.value;

        this.userService.login(username, password)
            .then(() => {

                // Get count of the products in the shopping cart.
                this.orderService.getCartProductsCount()
                    .then(resp => {
                        resp = resp.json();

                        const cartProductsCount = resp['count'];
                        if (cartProductsCount !== undefined) {
                            localStorage.setItem('shoppingCartCount', '' + cartProductsCount);
                        }
                    })
                    .catch(err => console.log(err));

                this.flashMessagesService.show('You are logged in!', { cssClass: 'alert-success' });
                this.router.navigate(['/']);
            })
            .catch(() =>
                this.flashMessagesService.show('Invalid credentials!', { cssClass: 'alert-danger' })
            );
    }

}
