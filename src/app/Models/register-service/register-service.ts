import { Service } from '../service/service';
import { Student } from '../student/student';

export class RegisterService {
  constructor(
    public id: number = 0,
    public student: Student,
    public service: Service,
    public status: number = 0,
    public motorbikeLicensePlate: string = ''
  ) {}
}
