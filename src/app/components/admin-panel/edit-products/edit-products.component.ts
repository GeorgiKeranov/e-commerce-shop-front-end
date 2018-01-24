import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Product } from '../../../objects/product';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css'],
  providers: [ProductService]
})
export class EditProductsComponent implements OnInit {

  products: Product[];

  // Query Params from the route.
  currentPage: number;
  searchWord: string;
  categoryId: number;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
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

  }

  addProductToDeleted(index: number) {

    // Deleting the product from the database.
    this.productService.deleteProductById(this.products[index].id)
      .then(() => {

        // Deleting the object from array.
        this.products.splice(index, 1);
      })
      .catch(() => {
        // TODO Displaying error message in alert box.
      });
  }
}
