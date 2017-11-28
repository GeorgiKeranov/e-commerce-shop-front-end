import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Message } from '../../objects/message';
import { Product } from '../../objects/product';
import { OrderService } from '../../services/order/order.service';
import { ProductService } from '../../services/product/product.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [ProductService, OrderService]
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  quantity = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService,
    private flashMessages: FlashMessagesService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const productId: number = params['id'];

      if (productId !== undefined && productId >= 0) {
        this.productService.getProductById(productId)
          .then(product => this.product = product)
          .catch(() => this.router.navigate(['/']));
      }
    });

  }

  minusOneQuantity() {
    if (this.quantity !== 1) {
      this.quantity -= 1;
    }
  }

  plusOneQuantity() {
    if (this.quantity !== 20) {
      this.quantity += 1;
    }
  }

  addOrderItemToShoppingCart() {

    if (!this.authService.loggedIn()) {

      this.flashMessages.show('You have to login first.', { cssClass: 'alert-warning' });
      this.router.navigate(['/login']);

    } else {

      this.orderService.addProductWithQuantityToCart(this.product.id, this.quantity)
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

            this.flashMessages.show(msg.message, { cssClass: 'alert-success' });
          }
        })
        .catch(err => console.log(err));
    }
  }

}
