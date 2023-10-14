export class Feedback {
  constructor(
    public id: number,
    public content: string,
    public sendDate: Date,
    public quantity: number,
    public status: number,
    public noteFromAdmin: string
  ) {}
}
