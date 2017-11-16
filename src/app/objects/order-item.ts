import { Product } from './product';

export class OrderItem {

    public changed: boolean;

    constructor(
        public id: number,
        public product: Product,
        public quantity: number
    ) { }

}
