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

    getCategories(): Promise<Category[]> {
        return this.http.get(getCategoriesUrl).toPromise()
            .then(resp => resp.json() as Category[]);
    }

    createCategory(categoryName: string): Promise<Message> {

        const params = {
            categoryName: categoryName
        };

        return this.http.post(createCategoryUrl, params, this.authService.getRequestOptions())
            .toPromise().then(resp => resp.json() as Message);
    }

    updateCategory(categoryName: string, categoryId: number): Promise<Message> {

        const params = {
            id: categoryId,
            categoryName: categoryName
        };

        return this.http.post(editCategoryUrl, params, this.authService.getRequestOptions())
            .toPromise().then(resp => resp.json() as Message);
    }

}
