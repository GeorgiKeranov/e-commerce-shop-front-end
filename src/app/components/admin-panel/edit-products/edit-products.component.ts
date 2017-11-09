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

}
