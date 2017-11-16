import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '../../services/product/product.service';
import { OrderService } from '../../services/order/order.service';
import { Product } from '../../objects/product';
import { Message } from '../../objects/message';
import { AuthenticationService } from '../../services/authentication.service';

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
        private router: Router
    ) { }

    ngOnInit() {
        this.productService.getProducts()
            .then(products => this.products = products);
    };

    getSummaryTitle(title: string): string {
        return title.length > 20 ? title.substring(0, 20) + '...' : title;
    }

    getSummaryDescription(desc: string): string {
        return desc.length > 50 ? desc.substring(0, 50) + '...' : desc;
    }

    addToCart(productId: number) {

        if (!this.authService.loggedIn()) {
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

