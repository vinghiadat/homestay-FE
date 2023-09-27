import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RoomType } from 'src/app/Models/roomtype/room-type';
import { Sesmester } from 'src/app/Models/sesmester/sesmester';
import { RoomlistService } from 'src/app/Services/roomtype/roomlist.service';
import { SesmesterService } from 'src/app/Services/sesmester/sesmester.service';
import Swal from 'sweetalert2';

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
  isCheckedDate: boolean = false; // Kiểm tra khoảng thời gian nằm trong vùng đăng ký
  isCheckedUpdateTime: boolean = false; //Kiểm tra khoảng thời gian nằm trong vùng update không
  startUpdateDate!: Date;
  endUpdateDate!: Date;
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
        this.startUpdateDate = new Date(this.sesmester.startDate);
        this.startUpdateDate.setDate(this.startUpdateDate.getDate() + 7);
        this.endUpdateDate = new Date(this.startUpdateDate);
        this.endUpdateDate.setDate(this.endUpdateDate.getDate() + 7);

        const registrationStartDate = new Date(
          this.sesmester.registrationStartDate
        );
        const registrationEndDate = new Date(
          this.sesmester.registrationEndDate
        );

        // Lấy ngày, tháng, năm từ myDate
        const myDateDay = this.myDate.getDate();
        const myDateMonth = this.myDate.getMonth() + 1; // Lưu ý phải cộng thêm 1 vì tháng trong JavaScript bắt đầu từ 0
        const myDateYear = this.myDate.getFullYear();

        // Lấy ngày, tháng, năm từ startUpdateDate
        const startUpdateDay = this.startUpdateDate.getDate();
        const startUpdateMonth = this.startUpdateDate.getMonth() + 1; // Lưu ý phải cộng thêm 1 vì tháng trong JavaScript bắt đầu từ 0
        const startUpdateYear = this.startUpdateDate.getFullYear();

        // Lấy ngày, tháng, năm từ endUpdateDate
        const endUpdateDay = this.endUpdateDate.getDate();
        const endUpdateMonth = this.endUpdateDate.getMonth() + 1; // Lưu ý phải cộng thêm 1 vì tháng trong JavaScript bắt đầu từ 0
        const endUpdateYear = this.endUpdateDate.getFullYear();

        // Lấy ngày, tháng, năm từ registrationStartDate
        const startDateDay = registrationStartDate.getDate();
        const startDateMonth = registrationStartDate.getMonth() + 1;
        const startDateYear = registrationStartDate.getFullYear();

        // Lấy ngày, tháng, năm từ registrationEndDate
        const endDateDay = registrationEndDate.getDate();
        const endDateMonth = registrationEndDate.getMonth() + 1;
        const endDateYear = registrationEndDate.getFullYear();

        if (
          myDateYear >= startDateYear &&
          myDateYear <= endDateYear &&
          myDateMonth >= startDateMonth &&
          myDateMonth <= endDateMonth &&
          myDateDay >= startDateDay &&
          myDateDay <= endDateDay
        ) {
          this.isCheckedDate = true;
        }

        if (
          myDateYear >= startUpdateYear &&
          myDateYear <= endUpdateYear &&
          myDateMonth >= startUpdateMonth &&
          myDateMonth <= endUpdateMonth &&
          myDateDay >= startUpdateDay &&
          myDateDay <= endUpdateDay
        ) {
          this.isCheckedUpdateTime = true;
        }
        console.log(this.isCheckedUpdateTime);
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
  handleOnClick(
    isCheckedDate: boolean,
    enableRoomType: boolean,
    isCheckedUpdateTime: boolean
  ) {
    if (
      !(
        (isCheckedUpdateTime === false && isCheckedDate === true) ||
        (isCheckedUpdateTime === true && isCheckedDate === false)
      )
    ) {
      Swal.fire('Đã hết hạn đăng ký', 'Vui lòng quay lại sau', 'error');
    }
    if (!enableRoomType) {
      Swal.fire(
        'Phòng đang sửa chữa',
        'Vui lòng chọn loại phòng khác !',
        'warning'
      );
    }
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
