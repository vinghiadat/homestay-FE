import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { RoomType } from 'src/app/Models/roomtype/room-type';
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
  imageUrls: string[] = [];
  ngOnInit(): void {
    if (this.roomType && this.roomType.images.length > 0) {
      this.roomType.images.forEach((image) => {
        this.imageService.getImage(image.name).subscribe((response) => {
          this.imageUrls.push(URL.createObjectURL(response.body!));
        });
      });
    }
  }
}
