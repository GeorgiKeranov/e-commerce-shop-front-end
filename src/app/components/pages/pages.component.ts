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
    this.router.navigate([this.pathToNavigate], { queryParams: { page: page } });
  }

}
