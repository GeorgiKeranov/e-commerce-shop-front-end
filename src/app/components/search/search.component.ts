import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CategoryService } from '../../services/category/category.service';
import { ProductService } from '../../services/product/product.service';
import { Category } from '../../objects/category';
import { Product } from '../../objects/product';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [CategoryService, ProductService]
})
export class SearchComponent implements OnInit {

  @Output() productsChanged = new EventEmitter();

  searchForm: FormGroup;

  categories: Category[];
  categoryIdToSearch: number = -1;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      keywords: ['']
    });
  }

  ngOnInit() {
    this.categoryService.getCategories()
      .then(categories => this.categories = categories);
  }

  onChange(categoryId) {
    this.categoryIdToSearch = categoryId;
  }

  onSearchSubmit() {
    this.productService.search(
      this.searchForm.get('keywords').value,
      this.categoryIdToSearch
    ).then((products: Product[]) => {
      // Send the products to the parent component
      this.productsChanged.emit(products);
    });
  }

}
