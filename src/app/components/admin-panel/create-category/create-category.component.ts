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

  onCreateCategorySubmit() {

    const categoryName = this.createCategoryForm.get('categoryName').value;

    this.categoryService.createCategory(categoryName)
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
