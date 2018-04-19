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
  categoryName: string;

  file: File;
  imageSrc: string;

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
          this.categoryName = category.categoryName;

          if (category.imageName == null) {
            this.imageSrc = '//localhost:8080/res/images/default-image.png';
          } else {
            this.imageSrc = this.categoryService.getImageUrl(category.imageName);
          }
        });
    });

  }

  generateImageUrl(event) {

    if (event.target.files && event.target.files[0]) {

      this.file = event.target.files[0];

      // Generate the fake url.
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onEditCategorySubmit() {
    this.categoryService.updateCategory(this.categoryName, this.categoryId, this.file)
      .then(resp => this.router.navigate(['/admin']))
      .catch(err => console.log(err));
  }

}
