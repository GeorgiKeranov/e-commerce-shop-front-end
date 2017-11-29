import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Product } from '../../../objects/product';
import { Category } from '../../../objects/category';
import { ProductService } from '../../../services/product/product.service';
import { CategoryService } from '../../../services/category/category.service';
import { Message } from '../../../objects/message';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  providers: [ProductService, CategoryService]
})
export class EditProductComponent implements OnInit {

  productId: number;
  product: Product;

  productForm: FormGroup;

  file: File;
  imageFakeUrl: string;

  categories: Category[];
  categorySelected: number = -1;

  errMessage: Message;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {

    this.productForm = this.formBuilder.group({
      // TODO validate data and handle errors from server.
      // TODO add option to add many images to product.
      title: [''],
      description: [''],
      price: ['']
    });
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.productId = +params['id']; // (+) converts string 'id' to a number

      // Checking if the id is of type number and if it isn't
      // navigating to page not found.
      if (!this.productId) {
        this.router.navigate(['/page-not-found']);
      } else {
        this.productService.getProductById(this.productId)
          .then((prod: Product) => {

            this.product = prod;

            this.productForm.controls.title.setValue(prod.title);
            this.productForm.controls.description.setValue(prod.description);
            this.productForm.controls.price.setValue(prod.price);

            this.categorySelected = prod.categories[0].id;

            this.imageFakeUrl = this.productService.getImageUrl(prod.mainImageName);
          })
          .catch(err => console.log(err));
      }
    });

    this.categoryService.getCategories()
      .then(categories => this.categories = categories);
  }

  onCategorySelected(categoryId) {
    this.categorySelected = categoryId;
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

    if (this.product.mainImageName !== undefined) {
      this.imageFakeUrl = this.product.mainImageName;
    } else {
      this.imageFakeUrl = undefined;
    }
    this.file = undefined;
  }

  onProductSubmit() {

    console.log('get called');

    const formData = new FormData();

    if (this.file) {
      formData.append('image', this.file);
    }

    formData.append('id', '' + this.productId);
    formData.append('title', this.productForm.get('title').value);
    formData.append('description', this.productForm.get('description').value);
    formData.append('price', this.productForm.get('price').value);
    formData.append('productCategories', '' + this.categorySelected);

    this.productService.updateProduct(formData)
      .then((msg: Message) => {
        console.log(msg);
        this.router.navigate(['/admin/products/edit']);
      })
      .catch(err => {
        this.errMessage = err.json() as Message;
        console.log(this.errMessage);
      });
  }

}

