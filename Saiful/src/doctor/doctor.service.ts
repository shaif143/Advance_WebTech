import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorForm } from './doctor.dto';

import { DoctorEntity } from './doctor.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorEntity)
    private doctorRepo: Repository<DoctorEntity>,
  ) {}

  insertDoctor(mydto: DoctorForm): any {
    return this.doctorRepo.save(mydto);
  }
  getPatientByDoctorID(id): any {
    return this.doctorRepo.find({
      where: { id: id },
      relations: {
        patient: true,
      },
    });
  }
}
