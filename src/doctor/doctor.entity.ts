import { PatientEntity } from 'src/patient/patiententity.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('doctor')
export class DoctorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => PatientEntity, (patient) => patient.doctors)
  patient: PatientEntity;
}
