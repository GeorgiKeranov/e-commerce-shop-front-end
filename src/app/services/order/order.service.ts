import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AuthenticationService } from '../authentication.service';
import { Message } from '../../objects/message';
import { OrderItem } from '../../objects/order-item';

const hostUrl = 'http://localhost:8080';

const orderItemsUrl = hostUrl + '/order/items';
const getCartProductsCountUrl = hostUrl + '/order/items/count';
const buyTheOrder = hostUrl + '/order/buy';

@Injectable()
export class OrderService {

    constructor(
        public http: Http,
        public authService: AuthenticationService,
    ) { }

    addProductToCart(productId: number): Promise<Message> {

        const body = {
            'product': {
                'id': productId
            }
        };

        return this.http.post(
            orderItemsUrl,
            body,
            this.authService.getRequestOptions()
        ).toPromise()
            .then(resp => resp.json() as Message);
    }

    getCartProductsCount(): Promise<Response> {
        return this.http.get(
            getCartProductsCountUrl,
            this.authService.getRequestOptions()
        ).toPromise();
    }

    getOrderItems(): Promise<OrderItem[]> {
        return this.http.get(orderItemsUrl, this.authService.getRequestOptions())
            .toPromise().then(resp => resp.json() as OrderItem[]);
    }

    updateQuantityOfOrderItem(orderItemId: number, quantity: number) {

        return this.http.put(
            orderItemsUrl + '/' + orderItemId + '?quantity=' + quantity,
            {},
            this.authService.getRequestOptions()
        ).toPromise().catch(resp => console.log(resp));
    }

    deleteOrderItem(orderItemId: number) {
        this.http.delete(orderItemsUrl + '/' + orderItemId, this.authService.getRequestOptions())
            .toPromise().catch(err => console.log(err));
    }

    buyTheOrder(): Promise<Response> {
        return this.http.post(
            buyTheOrder,
            {},
            this.authService.getRequestOptions()
        ).toPromise();
    }
}
