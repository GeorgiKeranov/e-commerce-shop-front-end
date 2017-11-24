import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '../../services/product/product.service';
import { OrderService } from '../../services/order/order.service';
import { Product } from '../../objects/product';
import { Message } from '../../objects/message';
import { AuthenticationService } from '../../services/authentication.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: 'app-home',
    providers: [ProductService, OrderService],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    products: Product[];

    constructor(
        private productService: ProductService,
        private orderService: OrderService,
        private authService: AuthenticationService,
        private router: Router,
        private flashMessages: FlashMessagesService
    ) { }

    ngOnInit() {
        this.productService.getProducts()
            .then(products => this.products = products);
    };

    getSummaryTitle(title: string): string {
        return title.length > 12 ? title.substring(0, 12) + '...' : title;
    }

    addToCart(productId: number) {

        if (!this.authService.loggedIn()) {
            this.flashMessages.show('You have to login first.', { cssClass: 'alert-warning' });
            this.router.navigate(['/login']);
        } else {
            this.orderService.addProductToCart(productId)
                .then((msg: Message) => {

                    if (!msg.error) {
                        this.orderService.getCartProductsCount()
                            .then(resp => {
                                resp = resp.json();
                                const cartProductsCount: number = resp['count'];

                                if (cartProductsCount) {
                                    localStorage.setItem('shoppingCartCount', '' + cartProductsCount);
                                }
                            });
                    }
                })
                .catch(err => console.log(err));
        }
    }

    changeProductsList(products: Product[]) {
        this.products = products;
    }

}

