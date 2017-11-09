import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product/product.service';
import { Product } from '../../objects/product';

@Component({
    selector: 'app-home',
    providers: [ProductService],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    products: Product[];

    constructor(
        private productService: ProductService
    ) { }

    ngOnInit() {
        this.productService.getProducts()
            .then(products => this.products = products);
    };

}

