import { Component, OnInit } from '@angular/core';

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
  errorMessage: string;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getProducts()
      .then((products: Product[]) => this.products = products);
  }

  checkProductDetails(product: Product) {
    console.log(product);
  }

  addProductToDeleted(index: number) {

    // Deleting the product from the database.
    this.productService.deleteProductById(this.products[index].id)
      .then(() => {

        // Deleting the object from array.
        this.products.splice(index, 1);
      })
      .catch(() => {
        this.errorMessage = 'This product can\'t be deleted because it is used in orders';
      });
  }
}
