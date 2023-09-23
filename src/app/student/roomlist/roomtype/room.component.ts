import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { RoomType } from 'src/app/Models/roomtype/room-type';
import { Sesmester } from 'src/app/Models/sesmester/sesmester';
import { ImageService } from 'src/app/Services/image/image.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class RoomComponent implements OnInit {
  constructor(private imageService: ImageService) {}
  @Input() roomType!: RoomType;

  // imageUrls: string[] = [];
  // ngOnInit(): void {
  //   console.log(this.roomType);
  //   this.roomType.images.forEach((image) => {
  //     this.imageService.getImage(image.name).subscribe((response) => {
  //       this.imageUrls.push(URL.createObjectURL(response.body!));
  //     });
  //   });
  // }
  imageUrl: string = '';
  ngOnInit(): void {
    if (this.roomType && this.roomType.images.length > 0) {
      this.imageService
        .getImage(this.roomType.images[0].name)
        .subscribe((response) => {
          this.displayImage(response.body!);
        });
    }
  }

  displayImage(imageData: Blob) {
    this.imageUrl = URL.createObjectURL(imageData);
    // Sử dụng imageUrl để hiển thị ảnh trong template của bạn
  }
}
