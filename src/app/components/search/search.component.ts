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
    this.categoryService.getCategories()
      .then(categories => this.categories = categories);
  }

  onChange(categoryId) {
    this.categoryIdToSearch = categoryId;
  }

  onSearchSubmit() {

    const searchWord = this.searchForm.controls.keywords.value;

    let queryParams = {};

    if (this.categoryIdToSearch >= 0 && searchWord !== '') {
      queryParams = {
        categoryId: this.categoryIdToSearch,
        searchWord: searchWord
      };
    }

    if (this.categoryIdToSearch == -1 && searchWord !== '') {
      queryParams = {
        searchWord: searchWord
      };
    }

    if (this.categoryIdToSearch >= 0 && searchWord === '') {
      queryParams = {
        categoryId: this.categoryIdToSearch
      };
    }

    this.router.navigate([this.pathToNavigate], { queryParams: queryParams });
  }

}
