import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { AuthenticationService } from '../authentication.service';
import { Message } from '../../objects/message';
import { OrderItem } from '../../objects/order-item';
import { Order } from '../../objects/order';
import { Product } from '../../objects/product';
import { User } from '../../objects/user';

const hostUrl = 'http://localhost:8080';

const orderItemsUrl = hostUrl + '/order/items';
const buyTheOrder = hostUrl + '/order/buy';
const completeOrderUrl = hostUrl + '/admin/orders/complete/';

const getOrderByIdUrl = hostUrl + '/admin/orders/';
const getCartProductsCountUrl = hostUrl + '/order/items/count';
const getOrdersWithStatusSentUrl = hostUrl + '/admin/orders?status=sent';
const getOrdersWithStatusCompletedUrl = hostUrl + '/admin/orders?status=completed';

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
        ).toPromise().then(resp => resp.json() as Message);
    }

    addProductWithQuantityToCart(productId: number, quantity: number): Promise<Message> {

        const body = {
            'product': {
                'id': productId
            },
            'quantity': quantity
        };

        return this.http.post(
            orderItemsUrl,
            body,
            this.authService.getRequestOptions()
        ).toPromise().then(resp => resp.json() as Message);
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

    getOrdersWithStatusSent(): Promise<Order[]> {
        return this.http.get(getOrdersWithStatusSentUrl, this.authService.getRequestOptions())
            .toPromise().then(resp => resp.json() as Order[]);
    }

    completeTheOrder(orderId: number) {
        return this.http.post(completeOrderUrl + orderId, {}, this.authService.getRequestOptions())
            .toPromise().then(resp => resp.json() as Message);
    }

    getOrderById(orderId: number): Promise<Order> {
        return this.http.get(getOrderByIdUrl + orderId, this.authService.getRequestOptions())
            .toPromise().then(resp => resp.json() as Order);
    }

    getUserByOrderId(orderId: number): Promise<User> {
        return this.http.get(getOrderByIdUrl + orderId + '/user', this.authService.getRequestOptions())
            .toPromise().then(resp => resp.json() as User);
    }

    getOrderItemsByOrderId(orderId: number): Promise<OrderItem[]> {
        return this.http.get(getOrderByIdUrl + orderId + '/items', this.authService.getRequestOptions())
            .toPromise().then(resp => resp.json() as OrderItem[]);
    }

    getOrdersWithStatusCompleted(): Promise<Order[]> {
        return this.http.get(getOrdersWithStatusCompletedUrl, this.authService.getRequestOptions())
            .toPromise().then(resp => resp.json() as Order[]);
    }

    updateOrderStatusToSent(orderId: number): Promise<Response> {
        return this.http.put(completeOrderUrl + orderId, {}, this.authService.getRequestOptions())
            .toPromise();
    }
}
