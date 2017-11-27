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
  _categoryId: number;
  _searchWord: string;

  pagesCount: number;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productService.getProductsCountWithParams(this._categoryId, this._searchWord)
      .then(json => this.pagesCount = json['count']);
  }

  @Input()
  set categoryId(categoryId: number) {
    this._categoryId = categoryId;
    this.ngOnInit();
  }

  @Input()
  set searchWord(searchWord: string) {
    this._searchWord = searchWord;
    this.ngOnInit();
  }

  toPage(page: number) {
    this.router.navigate([this.pathToNavigate], { queryParams: this.getQueryParams(page) });
  }

  previousPage() {
    this.router.navigate([this.pathToNavigate], { queryParams: this.getQueryParams(this.currentPage - 1) });
  }

  nextPage() {
    this.router.navigate([this.pathToNavigate], { queryParams: this.getQueryParams(this.currentPage + 1) });
  }

  getQueryParams(page: number): object {
    let params = {};

    if (this._categoryId >= 0 && this._searchWord) {
      params = {
        categoryId: this._categoryId,
        searchWord: this._searchWord,
        page: page
      };
    }

    if (!this._categoryId && this._searchWord) {
      params = {
        searchWord: this._searchWord,
        page: page
      };
    }

    if (this._categoryId >= 0 && !this._searchWord) {
      params = {
        categoryId: this._categoryId,
        page: page
      };
    }

    if (!this._categoryId && !this._searchWord) {
      params = {
        page: page
      };
    }

    console.log(params);

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
