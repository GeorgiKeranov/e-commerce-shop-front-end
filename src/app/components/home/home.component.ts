import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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

    // Query Params from the Route.
    currentPage: number;
    searchWord: string;
    categoryId: number;

    constructor(
        private productService: ProductService,
        private orderService: OrderService,
        private authService: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute,
        private flashMessages: FlashMessagesService
    ) { }

    ngOnInit() {

        this.route.queryParams.subscribe(params => {

            if (params['page']) {
                this.currentPage = +params['page'];
            } else {
                this.currentPage = 1;
            }

            if (params['searchWord']) {
                this.searchWord = params['searchWord'];
            } else {
                this.searchWord = undefined;
            }

            if (params['categoryId']) {
                this.categoryId = params['categoryId'];
            } else {
                this.categoryId = undefined;
            }

            this.productService.getProductsByParams(this.currentPage, this.categoryId, this.searchWord)
                .then(products => this.products = products);
        });
    };

    getSummaryTitle(title: string): string {
        return title.length > 20 ? title.substring(0, 20) + '...' : title;
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

}

