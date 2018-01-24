import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AuthenticationService } from '../authentication.service';
import { Message } from '../../objects/message';
import { Product } from '../../objects/product';
import { OrderItem } from '../../objects/order-item';

const hostUrl = 'http://localhost:8080';

const productsUrl = hostUrl + '/products';
const productsCountUrl = productsUrl + '/count';
const adminProductsUrl = hostUrl + '/admin/products/';
const saveProductUrl = adminProductsUrl + 'create';
const updateProductUrl = adminProductsUrl + 'update';


@Injectable()
export class ProductService {

    constructor(
        private http: Http,
        private authService: AuthenticationService
    ) { }

    getProducts(): Promise<Product[]> {
        return this.http.get(productsUrl)
            .toPromise()
            .then((response: Response) => response.json() as Product[]);
    }

    getProductsByParams(page: number, categoryId: number, searchWord: string): Promise<Product[]> {

        // Checking if there are params and if they are we are adding ? to the url.
        let url = (page >= 0 || categoryId || searchWord) ? productsUrl + '?' : productsUrl;

        let moreThanOneParam = false;

        if (page > 0) {
            url += 'page=' + (page - 1);
            moreThanOneParam = true;
        }

        if (categoryId !== undefined && categoryId !== -1) {
            url += moreThanOneParam ? '&' : '';
            url += 'categoryId=' + categoryId;
            moreThanOneParam = true;
        }

        if (searchWord) {
            url += moreThanOneParam ? '&' : '';
            url += 'searchWord=' + searchWord;
        }

        return this.http.get(url)
            .toPromise().then(resp => resp.json() as Product[]);
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

    deleteProductById(productId: number) {
        return this.http.delete(adminProductsUrl + productId, this.authService.getRequestOptions())
            .toPromise();
    }

    getProductsCountWithParams(categoryId: number, searchWord: string): Promise<JSON> {

        // Checking if there are params and if they are we are adding ? to the url.
        let url = (categoryId || searchWord) ? productsCountUrl + '?' : productsCountUrl;
        let moreThanOneParam = false;

        if (categoryId && categoryId !== -1) {
            url += 'categoryId=' + categoryId;
            moreThanOneParam = true;
        }

        if (searchWord) {
            url += moreThanOneParam ? '&' : '';
            url += 'searchWord=' + searchWord;
        }

        return this.http.get(url)
            .toPromise().then(resp => resp.json());
    }
}
