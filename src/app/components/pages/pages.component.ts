import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
  providers: [ProductService]
})
export class PagesComponent implements OnInit {

  @Input() pathToNavigate: string;
  @Input() currentPage: number;
  @Input() categoryIdHide = false;
  _categoryId: number;
  _searchWord: string;
  pagesCount: number;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  @Input()
  set categoryId(categoryId: number) {
    if (categoryId !== undefined) {
      this._categoryId = categoryId;
      this.ngOnInit();
    }
  }

  @Input()
  set searchWord(searchWord: string) {
    if (searchWord !== undefined) {
      this._searchWord = searchWord;
      this.ngOnInit();
    }
  }

  ngOnInit() {
    this.productService.getProductsCountWithParams(this._categoryId, this._searchWord)
      .then(json => this.pagesCount = json['count']);
  }

  toPage(page: number) {
    this.router.navigate([this.pathToNavigate], { queryParams: this.getQueryParams(page) });
    window.scrollTo(0, 0);
  }

  previousPage() {
    this.router.navigate([this.pathToNavigate], { queryParams: this.getQueryParams(this.currentPage - 1) });
    window.scrollTo(0, 0);
  }

  nextPage() {
    this.router.navigate([this.pathToNavigate], { queryParams: this.getQueryParams(this.currentPage + 1) });
    window.scrollTo(0, 0);
  }

  getQueryParams(page: number): object {
    const params = {
      categoryId: this.categoryIdHide ? undefined : this._categoryId,
      searchWord: this._searchWord,
      page: page
    };

    return params;
  }

  previousStyle() {
    if (this.currentPage === 1) {
      return 'disabled';
    }
  }

  nextStyle() {
    if (this.currentPage === this.pagesCount) {
      return 'disabled';
    }
  }

}
