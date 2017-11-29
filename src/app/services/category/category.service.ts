import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Category } from '../../objects/category';
import { Message } from '../../objects/message';
import { AuthenticationService } from '../authentication.service';

const hostUrl = 'http://localhost:8080';
const createCategoryUrl: string = hostUrl + '/admin/categories/create';
const editCategoryUrl: string = hostUrl + '/admin/categories/update';
const getCategoriesUrl: string = hostUrl + '/categories';

@Injectable()
export class CategoryService {

    constructor(
        private http: Http,
        private authService: AuthenticationService
    ) { }

    getImageUrl(imageName: string): string {

        let imageUrl = 'http://localhost:8080/res/images/';
        if (imageName) {
            return imageUrl = imageUrl + imageName;
        } else {
            return imageUrl = imageUrl + 'default-image.png';
        }
    }

    getCategoryById(categoryId: number): Promise<Category> {
        return this.http.get(getCategoriesUrl + '/' + categoryId).toPromise()
            .then(resp => resp.json() as Category);
    }

    getCategories(): Promise<Category[]> {
        return this.http.get(getCategoriesUrl)
            .toPromise()
            .then((response: Response) => response.json() as Category[]);
    }

    createCategory(categoryName: string, image: File): Promise<Message> {

        const formData = new FormData();
        formData.append('categoryName', categoryName);

        if (image) {
            formData.append('image', image);
        }

        return this.http.post(createCategoryUrl, formData, this.authService.getRequestOptionsFormData())
            .toPromise().then(resp => resp.json() as Message);
    }

    updateCategory(categoryName: string, categoryId: number, image: File): Promise<Message> {

        const formData = new FormData();
        formData.append('id', '' + categoryId);
        formData.append('categoryName', categoryName);

        if (image) {
            formData.append('image', image);
        }

        return this.http.post(editCategoryUrl, formData, this.authService.getRequestOptionsFormData())
            .toPromise().then(resp => resp.json() as Message);
    }

}
