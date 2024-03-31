import { User } from "../user/user";

export class Logger {
    constructor(
        public users: User,
        public dateTime: Date,
        public content: string,
        public roleName: string
    ) {

    }
}