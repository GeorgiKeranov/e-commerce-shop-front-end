import { Category } from './category';

export class Product {

    constructor(
        public title: string,
        public description: string,
        public price: number,
        public productCategory: number,
        public categories: Category[],
        public mainImageName: string
    ) { }

}
