import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../objects/category';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [CategoryService]
})
export class CatalogComponent implements OnInit {

  categories: Category[];

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.getCategories()
      .then(categories => this.categories = categories);
  }

}
