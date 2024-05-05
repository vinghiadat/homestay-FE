import { Type } from "../homestayType/type";

export class Room {
    constructor(
        public id: number,
        public roomName: string,
        public description: string,
        public maxQuantity: number,
        public status: boolean,
        public img: string,
        public price: number,
        public type: Type,
    ){}
}