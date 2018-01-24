import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../../services/product/product.service';
import { Product } from '../../objects/product';
import { OrderService } from '../../services/order/order.service';
import { Message } from '../../objects/message';
import { AuthenticationService } from '../../services/authentication.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css'],
  providers: [ProductService, OrderService]
})
export class CategoryProductsComponent implements OnInit {

  categoryId: number;
  searchWord: string;
  currentPage: number;

  products: Product[];

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.categoryId = +params['id'];

      this.route.queryParams.subscribe(queryParams => {
        if (queryParams['page']) {
          this.currentPage = +queryParams['page'];
        } else {
          this.currentPage = 1;
        }

        if (queryParams['searchWord']) {
          this.searchWord = queryParams['searchWord'];
        } else {
          this.searchWord = undefined;
        }

        this.productService.getProductsByParams(this.currentPage, this.categoryId, this.searchWord)
          .then(products => this.products = products);
      });

    });

  }

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
