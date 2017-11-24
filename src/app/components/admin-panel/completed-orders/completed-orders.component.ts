import { Component, OnInit } from '@angular/core';

import { Order } from '../../../objects/order';
import { OrderService } from '../../../services/order/order.service';

@Component({
  selector: 'app-completed-orders',
  templateUrl: './completed-orders.component.html',
  styleUrls: ['./completed-orders.component.css'],
  providers: [OrderService]
})
export class CompletedOrdersComponent implements OnInit {

  orders: Order[];

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orderService.getOrdersWithStatusCompleted()
      .then((orders: Order[]) => this.orders = orders);
  }

  removeOrder(index: number) {

    // Remove the orders from the back end.

    this.orders.splice(index, 1);
  }

}
