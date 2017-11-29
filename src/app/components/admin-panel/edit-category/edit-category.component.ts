import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Category } from '../../../objects/category';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
  providers: [CategoryService]
})
export class EditCategoryComponent implements OnInit {

  categoryId: number;
  oldCategoryName: string;
  categoryName: string;

  file: File;
  imageFakeUrl: string;

  editCategoryForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.editCategoryForm = this.formBuilder.group({
      categoryName: ['']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryId = +params['id'];

      this.categoryService.getCategoryById(this.categoryId)
        .then((category: Category) => {
          this.categoryName = this.oldCategoryName = category.categoryName;
        });
    });
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

  onInput(newCategoryName: string) {

    // if newCategoryName is blank set the global categoryName to the old name.
    if (newCategoryName === '' || newCategoryName === undefined) {
      this.categoryName = this.oldCategoryName;
    } else {
      this.categoryName = newCategoryName;
    }
  }

  onEditCategorySubmit() {
    this.categoryService.updateCategory(this.categoryName, this.categoryId, this.file)
      .then(resp => this.router.navigate(['/admin']))
      .catch(err => console.log(err));
  }

}
