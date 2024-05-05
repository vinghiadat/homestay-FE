import { Room } from "../homestay/room";
import { User } from "../user/user";

export class Booking {
    constructor(
        public id: number,
        public room: Room,
        public registrationDate: Date,
        public startDateTime: Date,
        public endDateTime: Date, 
        public price: number,
        public status: number, 
        public paymentMethod: string,
        public users: User, 
        public fullname: string,
        public phoneNumber: string, 
        public email: number
    ){}
}
