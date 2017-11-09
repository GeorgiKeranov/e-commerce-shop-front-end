import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AuthenticationService } from '../authentication.service';
import { Message } from '../../objects/message';
import { Category } from '../../objects/category';
import { Product } from '../../objects/product';

const categoriesUrl = 'http://localhost:8080/categories';
const productsUrl = 'http://localhost:8080/products';
const saveProductUrl = 'http://localhost:8080/admin/products/create';
const updateProductUrl = 'http://localhost:8080/admin/products/update';

@Injectable()
export class ProductService {

    constructor(
        private http: Http,
        private authService: AuthenticationService
    ) { }

    getCategories(): Promise<Category[]> {
        return this.http.get(categoriesUrl)
            .toPromise()
            .then((response: Response) => response.json() as Category[]);
    }

    getProducts(): Promise<Product[]> {
        return this.http.get(productsUrl)
            .toPromise()
            .then((response: Response) => response.json() as Product[]);
    }

    saveProduct(formData: FormData): Promise<Message> {
        return this.http.post(saveProductUrl, formData, this.authService.getRequestOptionsFormData()).toPromise()
            .then(resp => resp.json() as Message);
    }

    updateProduct(formData: FormData): Promise<Message> {
        return this.http.post(updateProductUrl, formData, this.authService.getRequestOptionsFormData()).toPromise()
            .then(resp => resp.json() as Message);
    }

    getImageUrl(imageName: string): string {

        let imageUrl = 'http://localhost:8080/res/images/';
        if (imageName) {
            return imageUrl = imageUrl + imageName;
        } else {
            return imageUrl = imageUrl + 'default-image.png';
        }
    }

    getProductById(id: number): Promise<Product> {
        return this.http.get(
            productsUrl + '/' + id,
            this.authService.getRequestOptions()
        ).toPromise()
            .then(resp => resp.json() as Product);
    }

}
