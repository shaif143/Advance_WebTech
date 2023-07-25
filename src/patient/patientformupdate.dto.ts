import { Length } from 'class-validator';

export class PatientFormUpdate {
  @Length(3, 8)
  name: string;
}
