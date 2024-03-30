import { Role } from "../role/role";

export class User {
    constructor(
        public id: number,
        public username: string,
        public password: string,
        public confirmPassword: string,
        public fullname: string,
        public address: string,
        public phoneNumber: string,
        public email: string,
        public roles: Role[], // Thêm trường này để chứa danh sách vai trò
        public status: Boolean
    ) {}
}
