import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RoomType } from 'src/app/Models/roomtype/room-type';
import { Sesmester } from 'src/app/Models/sesmester/sesmester';
import { RoomlistService } from 'src/app/Services/roomtype/roomlist.service';
import { SesmesterService } from 'src/app/Services/sesmester/sesmester.service';

@Component({
  selector: 'app-roomlist',
  templateUrl: './roomlist.component.html',
  styleUrls: ['./roomlist.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class RoomlistComponent implements OnInit {
  listQuantity: number[] = [];
  listRoomType: RoomType[] = [];
  sesmester!: Sesmester;

  myDate: Date = new Date();
  isCheckedDate: boolean = false;
  quantity: number = 0;
  airConditioned: boolean = false;
  cooked: boolean = false;

  constructor(
    private roomListService: RoomlistService,
    private sesmesterService: SesmesterService
  ) {}
  ngOnInit(): void {
    this.sesmesterService.getSesmesterByStatus().subscribe({
      next: (response: Sesmester) => {
        this.sesmester = response;
        if (
          new Date(this.sesmester.registrationStartDate) <= this.myDate &&
          this.myDate <= new Date(this.sesmester.registrationEndDate)
        ) {
          this.isCheckedDate = true;
        }
      },
      error: (error) => {},
    });
    this.roomListService.getQuantityRoomType().subscribe({
      next: (response: number[]) => {
        this.listQuantity = response;
      },
      error: (error) => {
        if (error.status === 401) {
        }
      },
    });
    this.getAllRoomType();
  }

  getAllRoomType(): void {
    this.roomListService.getAllRoomType().subscribe({
      next: (response: any) => {
        this.listRoomType = response;
      },
      error: (error) => {
        if (error.status === 401) {
        }
      },
    });
  }

  onChange() {
    if (
      this.quantity == 0 &&
      this.airConditioned == false &&
      this.cooked == false
    ) {
      this.getAllRoomType();
    } else {
      if (
        this.quantity != 0 &&
        this.airConditioned == true &&
        this.cooked == true
      ) {
        this.roomListService
          .getAllRoomTypeByMaxQuantityAndIsCookedAndIsAirConditioned(
            this.quantity,
            this.cooked,
            this.airConditioned
          )
          .subscribe({
            next: (response: any) => {
              this.listRoomType = response;
            },
            error: (error) => {},
          });
      } else {
        if (
          this.quantity != 0 &&
          this.airConditioned == false &&
          this.cooked == false
        ) {
          this.roomListService
            .getAllRoomTypeByMaxQuantity(this.quantity)
            .subscribe({
              next: (response: any) => {
                this.listRoomType = response;
              },
              error: (error) => {},
            });
        }
        if (
          this.quantity == 0 &&
          this.airConditioned != false &&
          this.cooked == false
        ) {
          this.roomListService
            .getAllRoomTypeByIsAirConditioned(this.airConditioned)
            .subscribe({
              next: (response: any) => {
                this.listRoomType = response;
              },
              error: (error) => {},
            });
        }
        if (
          this.quantity == 0 &&
          this.airConditioned == false &&
          this.cooked != false
        ) {
          this.roomListService.getAllRoomTypeByIsCooked(this.cooked).subscribe({
            next: (response: any) => {
              this.listRoomType = response;
            },
            error: (error) => {},
          });
        }
        if (
          this.quantity != 0 &&
          this.airConditioned != false &&
          this.cooked == false
        ) {
          this.roomListService
            .getAllRoomTypeByMaxQuantityAndIsAirConditioned(
              this.quantity,
              this.airConditioned
            )
            .subscribe({
              next: (response: any) => {
                this.listRoomType = response;
              },
              error: (error) => {},
            });
        }
        if (
          this.quantity != 0 &&
          this.airConditioned == false &&
          this.cooked != false
        ) {
          this.roomListService
            .getAllRoomTypeByMaxQuantityAndIsCooked(this.quantity, this.cooked)
            .subscribe({
              next: (response: any) => {
                this.listRoomType = response;
              },
              error: (error) => {},
            });
        }
        if (
          this.quantity == 0 &&
          this.airConditioned != false &&
          this.cooked != false
        ) {
          this.roomListService
            .getAllRoomTypeByIsCookedAndIsAirConditioned(
              this.cooked,
              this.airConditioned
            )
            .subscribe({
              next: (response: any) => {
                this.listRoomType = response;
              },
              error: (error) => {},
            });
        }
      }
    }
  }
}
