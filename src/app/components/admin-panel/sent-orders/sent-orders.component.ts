import { Component, OnInit } from '@angular/core';

import { Order } from '../../../objects/order';
import { OrderService } from '../../../services/order/order.service';

@Component({
  selector: 'app-sent-orders',
  templateUrl: './sent-orders.component.html',
  styleUrls: ['./sent-orders.component.css'],
  providers: [OrderService]
})
export class SentOrdersComponent implements OnInit {

  orders: Order[];

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orderService.getOrdersWithStatusSent()
      .then((orders: Order[]) => this.orders = orders);
  }

}
