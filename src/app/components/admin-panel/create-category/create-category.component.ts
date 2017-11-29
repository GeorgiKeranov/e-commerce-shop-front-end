import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { FlashMessagesService } from 'angular2-flash-messages';
import { CategoryService } from '../../../services/category/category.service';
import { Message } from '../../../objects/message';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
  providers: [CategoryService]
})
export class CreateCategoryComponent implements OnInit {

  createCategoryForm: FormGroup;
  imageFakeUrl: string;
  file: File;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private flashMessagesService: FlashMessagesService
  ) {
    this.createCategoryForm = this.formBuilder.group({
      categoryName: ['']
    });
  }

  ngOnInit() {
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

  onCreateCategorySubmit() {

    const categoryName = this.createCategoryForm.get('categoryName').value;

    this.categoryService.createCategory(categoryName, this.file)
      .then((msg: Message) => {
        this.router.navigate(['/admin']);
        this.flashMessagesService.show('Category was successful saved!', { cssClass: 'alert-success' });
      })
      .catch(resp => {
        const msg: Message = resp.json() as Message;
        console.log(msg);
      });
  }

}
