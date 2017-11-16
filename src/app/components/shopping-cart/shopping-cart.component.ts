import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { OrderService } from '../../services/order/order.service';
import { ProductService } from '../../services/product/product.service';
import { OrderItem } from '../../objects/order-item';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  providers: [OrderService, ProductService]
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  orderItems: OrderItem[];
  removedItemIds = new Array<number>();

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private flashMessagesService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.orderService.getOrderItems()
      .then((orderItems: OrderItem[]) => {
        this.orderItems = orderItems;
        localStorage.setItem('shoppingCartCount', '' + this.orderItems.length);
      })
      .catch(err => console.log(err));
  }

  getTotalPrice() {
    let totalPrice = 0;

    if (this.orderItems !== undefined) {
      for (const orderItem of this.orderItems) {
        totalPrice += orderItem.quantity * orderItem.product.price;
      }
    }

    return totalPrice;
  }

  minusOneQuantity(orderItem: OrderItem) {
    if (orderItem.quantity !== 1) {
      orderItem.quantity -= 1;
      orderItem.changed = true;
    }
  }

  plusOneQuantity(orderItem: OrderItem) {
    if (orderItem.quantity !== 20) {
      orderItem.quantity += 1;
      orderItem.changed = true;
    }
  }

  removeItemFromCart(orderItemIndex: number) {

    localStorage.setItem('shoppingCartCount', '' + (+localStorage.getItem('shoppingCartCount') - 1));

    this.removedItemIds.push(this.orderItems[orderItemIndex].id);
    this.orderItems.splice(orderItemIndex, 1);
  }

  updateQuantities() {

    if (this.orderItems) {
      for (const orderItem of this.orderItems) {

        if (orderItem.changed === true) {
          this.orderService.updateQuantityOfOrderItem(orderItem.id, orderItem.quantity);
        }
      }
    }

  }

  deleteRemovedOrderItems() {
    if (this.removedItemIds) {
      for (const orderItemIndex of this.removedItemIds) {
        this.orderService.deleteOrderItem(orderItemIndex);
      }
    }
  }

  ngOnDestroy() {

    // Deleting removed items and updating quantities of existing items
    // when the shopping cart component is destroyed.
    this.deleteRemovedOrderItems();
    this.updateQuantities();
  }

  orderTheProducts() {
    this.deleteRemovedOrderItems();
    this.updateQuantities();

    setTimeout(2000);

    if (this.orderItems.length === 0) {
      this.flashMessagesService.show(
        'There are not products in the shopping cart', { cssClass: 'alert-danger' }
      );
    } else {

      this.orderService.buyTheOrder()
        .then(() => {
          localStorage.setItem('shoppingCartCount', '0');

          this.flashMessagesService.show('Order is sent', { cssClass: 'alert-success' });
          this.router.navigate(['/']);
        })
        .catch(() => this.flashMessagesService.show(
          'There are not products in the shopping cart', { cssClass: 'alert-danger' }
        )
        );

    }
  }

}
