import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientController } from './patient.controller';
import { PatientService } from './patientservice.service';
import { PatientEntity } from './patiententity.entity';
import { DoctorService } from 'src/doctor/doctor.service';
import { DoctorEntity } from 'src/doctor/doctor.entity';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'your email address',
          pass: 'your app password',
        },
      },
    }),

    TypeOrmModule.forFeature([PatientEntity, DoctorEntity]),
  ],
  controllers: [PatientController],
  providers: [PatientService, DoctorService],
})
export class PatientModule {}
