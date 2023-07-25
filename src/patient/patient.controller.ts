import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DoctorForm } from 'src/doctor/doctor.dto';
import { DoctorService } from 'src/doctor/doctor.service';
import { PatientForm } from './patientform.dto';
import { PatientFormUpdate } from './patientformupdate.dto';
import { PatientService } from './patientservice.service';
import { SessionGuard } from './session.guard';

@Controller('/patient')
export class PatientController {
  constructor(
    private patientService: PatientService,
    private doctorService: DoctorService,
  ) {}

  @Get('/index')
  getPatient(): any {
    return this.patientService.getIndex();
  }

  @Get('/findpatient/:id')
  getPatientByID(@Param('id', ParseIntPipe) id: number): any {
    return this.patientService.getUserByID(id);
  }

  @Get('/findpatient')
  getPatientByIDName(@Query() qry: any): any {
    return this.patientService.getUserByIDName(qry);
  }
  @Post('/insertpatient')
  @UsePipes(new ValidationPipe())
  insertPatient(@Body() mydto: PatientForm): any {
    return this.patientService.insertUser(mydto);
  }

  @Put('/updatepatient/')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  updatePatient(@Session() session, @Body('name') name: string): any {
    console.log(session.email);
    return this.patientService.updateUser(name, session.email);
  }

  @Put('/updatepatient/:id')
  @UsePipes(new ValidationPipe())
  updatePatientbyid(
    @Body() mydto: PatientFormUpdate,
    @Param('id', ParseIntPipe) id: number,
  ): any {
    return this.patientService.updateUserbyid(mydto, id);
  }

  @Delete('/deletepatient/:id')
  deletePatientbyid(@Param('id', ParseIntPipe) id: number): any {
    return this.patientService.deleteUserbyid(id);
  }

  @Post('/insertdoctor')
  @UsePipes(new ValidationPipe())
  insertDoctor(@Body() doctordto: DoctorForm): any {
    return this.doctorService.insertDoctor(doctordto);
  }

  @Get('/finddoctorsbypatient/:id')
  getDoctorByPatientID(@Param('id', ParseIntPipe) id: number): any {
    return this.patientService.getDoctorsByPatientID(id);
  }

  @Get('/findpatientbydoctor/:id')
  getPatientByDoctorID(@Param('id', ParseIntPipe) id: number): any {
    return this.doctorService.getPatientByDoctorID(id);
  }

  @Post('/signup')
  @UseInterceptors(
    FileInterceptor('myfile', {
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  signup(
    @Body() mydto: PatientForm,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 16000 }),
          new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    mydto.filename = file.filename;

    return this.patientService.signup(mydto);
    console.log(file);
  }

  @Post('/signin')
  async signin(@Session() session, @Body() mydto: PatientForm) {
    if (await this.patientService.signin(mydto)) {
      session.email = mydto.email;

      console.log(session.email);
      return { message: 'success' };
    } else {
      return { message: 'invalid credentials' };
    }
  }

  @Get('/signout')
  signout(@Session() session) {
    if (session.destroy()) {
      return { message: 'you are logged out' };
    } else {
      throw new UnauthorizedException('invalid actions');
    }
  }
  @Post('/sendemail')
  sendEmail(@Body() mydata) {
    return this.patientService.sendEmail(mydata);
  }
}
