import { Role } from './role';

export class User {

    constructor(
        public username: string,
        public country: string,
        public address: string,
        public email: string,
        public firstName: string,
        public lastName: string,
        public phone: string,
        public roles: Role[],
        public role: string
    ) { }

}