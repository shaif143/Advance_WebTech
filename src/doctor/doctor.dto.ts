import { IsNotEmpty } from 'class-validator';

export class DoctorForm {
  @IsNotEmpty()
  name: string;

  patientid: number;
}
