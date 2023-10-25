export class RegisterServiceDto {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public status: number,
    public motorbikeLicensePlate: string
  ) {}
}
