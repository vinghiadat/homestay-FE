import { Room } from '../room/room';
import { RoomType } from '../roomtype/room-type';
import { Sesmester } from '../sesmester/sesmester';

export class RoomReservation {
  constructor(
    public id: number,
    public bookingDateTime: Date,
    public status: number,
    public sesmester: Sesmester,
    public room: Room,
    public roomType: RoomType
  ) {}
}
