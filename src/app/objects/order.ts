

export class Order {

    constructor(
        public id: number,
        public status: string,
        public price: number,
        public fullName: string,
        public email: string
    ) { }
}
