import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../objects/category';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [CategoryService]
})
export class SearchComponent implements OnInit {

  @Input() pathToNavigate: string;
  @Input() categoriesHide: boolean = false;

  searchForm: FormGroup;

  categories: Category[];
  categoryIdToSearch: number = -1;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      keywords: ['']
    });
  }

  ngOnInit() {

    if (!this.categoriesHide) {
      this.categoryService.getCategories()
        .then(categories => this.categories = categories);
    }
  }

  onChange(categoryId) {
    this.categoryIdToSearch = categoryId;
  }

  onSearchSubmit() {

    const searchWord = this.searchForm.controls.keywords.value;

    const queryParams = {
      categoryId: this.categoryIdToSearch >= 0 ? this.categoryIdToSearch : undefined,
      searchWord: searchWord !== '' ? searchWord : undefined
    };

    this.router.navigate([this.pathToNavigate], { queryParams: queryParams });
  }

}
