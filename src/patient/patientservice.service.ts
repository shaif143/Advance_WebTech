import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientEntity } from './patiententity.entity';
import { PatientForm } from './patientform.dto';
import { PatientFormUpdate } from './patientformupdate.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer/dist';
@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientEntity)
    private patientRepo: Repository<PatientEntity>,
    private mailerService: MailerService,
  ) {}

  getIndex(): any {
    return this.patientRepo.find();
  }
  getUserByID(id): any {
    return this.patientRepo.findOneBy({ id });
  }

  getUserByIDName(qry): any {
    return this.patientRepo.findOneBy({ id: qry.id, name: qry.name });
  }

  insertUser(mydto: PatientForm): any {
    const patientaccount = new PatientEntity();
    patientaccount.name = mydto.name;
    patientaccount.email = mydto.email;
    patientaccount.password = mydto.password;
    patientaccount.address = mydto.address;
    return this.patientRepo.save(patientaccount);
  }

  updateUser(name, email): any {
    return this.patientRepo.update({ email: email }, { name: name });
  }
  updateUserbyid(mydto: PatientFormUpdate, id): any {
    return this.patientRepo.update(id, mydto);
  }
  deleteUserbyid(id): any {
    return this.patientRepo.delete(id);
  }

  getDoctorsByPatientID(id): any {
    return this.patientRepo.find({
      where: { id: id },
      relations: {
        doctors: true,
      },
    });
  }

  async signup(mydto) {
    const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(mydto.password, salt);
    mydto.password = hassedpassed;
    return this.patientRepo.save(mydto);
  }

  async signin(mydto) {
    console.log(mydto.password);
    const mydata = await this.patientRepo.findOneBy({
      email: mydto.email,
    });
    console.log('mydata:', mydata);
    const isMatch = await bcrypt.compare(mydto.password, mydata.password);
    if (isMatch) {
      return 1;
    } else {
      return 0;
    }
  }

  async sendEmail(mydata) {
    return await this.mailerService.sendMail({
      to: mydata.email,
      subject: mydata.subject,
      text: mydata.text,
    });
  }
}
