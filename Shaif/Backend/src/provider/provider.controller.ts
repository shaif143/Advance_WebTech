import { Body, Controller, Delete, Get, HttpException, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Req, Session, UnauthorizedException, UploadedFile, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe, HttpStatus, Res } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import session = require("express-session");
import { diskStorage, MulterError } from "multer";
import { ServiceAddDTO } from "src/service/service.dto";
import { CivilianRegDTO } from "src/civilian/civilian.dto";
import { BankInfoDTO } from "src/bankingDetails/bankinfo.dto";
import { ProviderLoginDTO, ProviderMessageDTO, ProviderRegDTO, ProviderUpdateDTO } from "./provider.dto";
import { ProviderService } from "./provider.service";
import { SessionGuard } from "./session.guard";
import { BankingEntity } from "src/bankingDetails/bankinfo.entity";
import { ServiceEntity } from "src/service/service.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { EmailEntity } from "./email-log.entity";
import { Repository } from "typeorm";
import { CivilianEntity } from "src/civilian/civilian.entity";


@Controller('Provider')
export class ProviderController {
    constructor (private readonly ProviderService:ProviderService,
        @InjectRepository(EmailEntity)
    private readonly emailLogRepository: Repository<EmailEntity>,
    ) {}


    @Post('register')
    @UsePipes(new ValidationPipe())
    async regProvider(@Body() providerRegInfo: ProviderRegDTO): Promise<string> {
        try {
            //  registration logic here
            await this.ProviderService.regProvider(providerRegInfo);
            return "Provider Registration Successful!";
        } catch (error) {
            
                // For any other unexpected error, throw a generic internal server error
                          throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
            
    }
}

    @Post('login')
    
    @UsePipes(new ValidationPipe())
    async loginProvider (@Body() ProviderLoginInfo:ProviderLoginDTO, @Session() session) {
        
        console.log(ProviderLoginInfo);

        const result = await this.ProviderService.loginProvider(ProviderLoginInfo);
        if (result) {
            
            session.username = ProviderLoginInfo.username;
         
            console.log("login session username: " + session.username);
           
            return session.username;
        } else {
            return new NotFoundException({ message: "Provider Not Found!" });
        } 

        
    }



    @Put('upload')
    @UseGuards(SessionGuard)
    @UseInterceptors(FileInterceptor('image',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg|gif)$/)) {
                    cb(null, true);
                } else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },
            limits: { fileSize: 300000 }, //bytes
            storage: diskStorage({
                destination: './uploads',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }))
    uploadProvider(@UploadedFile() photoObj: Express.Multer.File, @Session() session) {
        console.log(photoObj.filename);
        const fileName = photoObj.filename;
        return this.ProviderService.uploadProvider(fileName, session.username);
    }

    @Get('photo/:filename')
    async getProviderPhoto(@Param('filename') filename: string, @Res() res) {
        return res.sendFile(filename, { root: './uploads' }); // Provide the correct path to the upload folder
    }



    @Get('photo')
    @UseGuards(SessionGuard)
    async getLoggedInProviderPhoto(@Session() session, @Res() res) {
        const username = session.username;
        const filename = await this.ProviderService.getProviderPhotoFileName(username);

        if (filename) {
            return res.redirect(`/provider/photo/${encodeURIComponent(filename)}`);
        } else {
            return "Something went wrong";
        }
    }

    @Get('/profile')
    @UseGuards(SessionGuard)
    viewProviderProfile (@Session() session) {
        return this.ProviderService.viewProviderProfile(session.username);
    }




    @Put('updateinfo')
    @UsePipes(new ValidationPipe())
    @UseGuards(SessionGuard)
    updateProviderInfo(@Body() ProviderUpdateInfo:ProviderUpdateDTO, @Session() session) : any {
        console.log(ProviderUpdateInfo);
        this.ProviderService.updateProviderInfo(ProviderUpdateInfo, session.username);
        return "Provider info updated successfully!";
    }



    @Post('provideServices')
    @UsePipes(new ValidationPipe())
    @UseGuards(SessionGuard)
    addServices(@Body()ServiceAddInfo :ServiceAddDTO, @Session() session): any {
        console.log(ServiceAddInfo);
        this.ProviderService.addServices(ServiceAddInfo, session.username);
        return "Service Added Successfully"
    }

    @Post('/addBankInfo')
    @UsePipes(new ValidationPipe())
    @UseGuards(SessionGuard)
    addBankInfo(@Body()addBankInfo :BankInfoDTO, @Session() session): any {
        try{
        console.log(addBankInfo);
        return this.ProviderService.addBankInfo(addBankInfo,session.username );
        
        }catch(error){
            throw new HttpException ('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @Post('/addCivilian')
    @UsePipes(new ValidationPipe())
    @UseGuards(SessionGuard)
    regCivilian(@Body() CivilianRegInfo:CivilianRegDTO, @Session() session): any {
        try{
        console.log(CivilianRegInfo);
        return this.ProviderService.regCivilian(CivilianRegInfo, session.username);

        }catch(error){
            throw new HttpException ('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);  
        }
    }

    @Post('sendmail/civilian')
    @UseGuards(SessionGuard)
    sendMailToCivilian (@Body() messageInfo:ProviderMessageDTO, @Session() session) {
        console.log(messageInfo);
        this.ProviderService.sendMailToCivilian(messageInfo, session.username);

        return "E-mail Send Successful!";
    }



    @Get('/getAllservices')
    @UseGuards(SessionGuard)
    viewNotification(@Session() session): Promise<ServiceEntity[]> {
        return this.ProviderService.viewService(session.username);
    }



    @Get('/getBankInfo')
    @UseGuards(SessionGuard)
    viewBankInfo(@Session() session): Promise<BankingEntity[]> {
        return this.ProviderService.viewBankInfo(session.username);
    }

    @Get('/getAllCivilian')
    @UseGuards(SessionGuard)
    viewCivilian(@Session() session): Promise<CivilianEntity[]> {
        return this.ProviderService.viewCivilian(session.username);
    }


    
    @Get('/emailHistory')
    @UseGuards(SessionGuard)
    viewEmails(@Session() session): Promise<EmailEntity[]> {
    return this.ProviderService.viewEmails(session.username);
    }



    @Delete('remove')
    @UseGuards(SessionGuard)
    removeProvider(@Session() session) : any {
     this.ProviderService.removeProvider(session.username);
     return "Account Deleted successfully";
    }


  



   


//     @Post('logout')
//  // @UseGuards(SessionGuard)
//   async logout(@Session() session) {
//     return this.ProviderService.Logout(session);

  
//   }

 

    //Provider can only search Civilian by their ID
    // @Get('search/Civilian')
    // @UseGuards(SessionGuard)
    // getCivilianByProviderId (@Session() session) : any {
    //     return this.ProviderService.getCivilianByProviderId(session.username);
    // }

    @Get('search/Civilian/:CivilianId')
    @UseGuards(SessionGuard)
    getCivilianById(@Param('CivilianId', ParseIntPipe) CivilianId: number, @Session() session): any {
    return this.ProviderService.getCivilianById(CivilianId, session.username);
}


    
    @Delete('remove/Civilian/:CivilianId')
    @UseGuards(SessionGuard)
    removeCivilian(@Param('CivilianId', ParseIntPipe) CivilianId:number, @Session() session) : any {
        return this.ProviderService.removeCivilian(CivilianId, session.username);
    }



    @Post('logout')
    
    logoutManager(@Req() req) {
        if (req.session.destroy()) {
            console.log('Provider Sign Out');
            return true;
        } else {
            throw new UnauthorizedException("Invalid Actions : Cannot Sign Out Provider!");
        }
    }


}
