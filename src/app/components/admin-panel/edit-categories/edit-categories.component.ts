import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../../../services/category/category.service';
import { Category } from '../../../objects/category';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.css'],
  providers: [CategoryService]
})
export class EditCategoriesComponent implements OnInit {

  categories: Category[];

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.getCategories()
      .then((categories: Category[]) => this.categories = categories);
  }

  onRemoveCategory(index: number) {
    this.categoryService.deleteCategoryById(this.categories[index].id)
      .then(() => this.categories.splice(index, 1));
  }

}
