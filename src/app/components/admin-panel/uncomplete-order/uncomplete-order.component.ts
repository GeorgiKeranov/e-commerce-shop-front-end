import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../../objects/user';
import { OrderItem } from '../../../objects/order-item';
import { OrderService } from '../../../services/order/order.service';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-uncomplete-order',
  templateUrl: './uncomplete-order.component.html',
  styleUrls: ['./uncomplete-order.component.css'],
  providers: [OrderService, ProductService]
})
export class UncompleteOrderComponent implements OnInit {

  orderId: number;
  orderItems: OrderItem[];
  customer: User;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.orderId = +params['id'];

      this.orderService.getUserByOrderId(this.orderId)
        .then((customer: User) => this.customer = customer);

      this.orderService.getOrderItemsByOrderId(this.orderId)
        .then((orderItems: OrderItem[]) => this.orderItems = orderItems);
    });

  }

  getTotalPrice() {

    let totalPrice = 0;

    if (this.orderItems) {
      for (const orderItem of this.orderItems) {
        totalPrice += (orderItem.quantity * orderItem.product.price);
      }
    }

    return totalPrice;
  }

  getSummaryTitle(title: string): string {
    return title.length > 20 ? title.substring(0, 20) + '...' : title;
  }

  changeOrderStatusToSent() {
    this.orderService.updateOrderStatusToSent(this.orderId)
      .then(resp => {
        this.router.navigate(['/admin/orders/completed']);
      });
  }

}
