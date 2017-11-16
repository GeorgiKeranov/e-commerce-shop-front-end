import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductService } from '../../../services/product/product.service';
import { CategoryService } from '../../../services/category/category.service';
import { Category } from '../../../objects/category';
import { Message } from '../../../objects/message';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
  providers: [ProductService, CategoryService]
})
export class CreateProductComponent implements OnInit {

  private productForm: FormGroup;

  private categories: Category[];
  private categoryIdForProduct: number = -1;

  private imageFakeUrl;
  private file: File;

  private errMessage: Message;

  processing: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private flashMessageService: FlashMessagesService
  ) {
    this.productForm = this.formBuilder.group({
      // TODO validate data and handle errors from server.
      // TODO add option to add many images to product.
      title: [''],
      description: [''],
      price: ['']
    });

    this.processing = false;
  }

  ngOnInit() {
    this.categoryService.getCategories()
      .then(categories => this.categories = categories);
  }

  onCategorySelected(categoryId) {
    this.categoryIdForProduct = categoryId;
    console.log(categoryId);
  }

  generateImageUrl(event) {

    if (event.target.files && event.target.files[0]) {

      this.file = event.target.files[0];

      // Generate the fake url.
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageFakeUrl = e.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  deleteImageUrl() {
    this.imageFakeUrl = undefined;
    this.file = undefined;
  }

  onProductSubmit() {

    this.processing = true;

    this.errMessage = undefined;

    const formData = new FormData();

    if (this.file) {
      formData.append('image', this.file);
    }

    formData.append('title', this.productForm.get('title').value);
    formData.append('description', this.productForm.get('description').value);
    formData.append('price', this.productForm.get('price').value);
    formData.append('productCategories', '' + this.categoryIdForProduct);

    this.productService.saveProduct(formData)
      .then((msg: Message) => {
        this.router.navigate(['/admin']);
        this.flashMessageService.show('Product was saved successfull!', { cssClass: 'alert-success' });
      })
      .catch(err => {
        this.errMessage = err.json() as Message;
        this.processing = false;
      });
  }

}
