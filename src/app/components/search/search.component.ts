import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ProductService } from '../../services/product/product.service';
import { Category } from '../../objects/category';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ProductService]
})
export class SearchComponent implements OnInit {

  private searchForm: FormGroup;

  private categories: Category[];
  private categoryIdToSearch: number = -1;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      keywords: ['']
    });
  }

  ngOnInit() {
    this.productService.getCategories()
      .then(categories => this.categories = categories);
  }

  onChange(categoryId) {
    this.categoryIdToSearch = categoryId;
    console.log(this.categoryIdToSearch);
  }

}
