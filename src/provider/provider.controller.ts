import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Session, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import session = require("express-session");
import { diskStorage, MulterError } from "multer";
import { ServiceAddDTO } from "src/service/service.dto";
import { CivilianRegDTO } from "src/civilian/civilian.dto";
import { SalaryDTO } from "src/salary/salary.dto";
import { ProviderLoginDTO, ProviderMessageDTO, ProviderRegDTO, ProviderUpdateDTO } from "./provider.dto";
import { ProviderService } from "./provider.service";
import { SessionGuard } from "./session.guard";
import { SalaryEntity } from "src/salary/salary.entity";
import { ProviderEntity } from "./provider.entity";

@Controller('Provider')
export class ProviderController {
    constructor (private readonly ProviderService:ProviderService) {}

    @Post('register')
    @UsePipes(new ValidationPipe())
    regProvider (@Body() ProviderRegInfo:ProviderRegDTO) : any {
        console.log(ProviderRegInfo);
        return this.ProviderService.regProvider(ProviderRegInfo);
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async loginProvider (@Body() ProviderLoginInfo:ProviderLoginDTO, @Session() session) {
        console.log(ProviderLoginInfo);

        //const x = await this.ProviderService.loginProvider(ProviderLoginInfo);
        if (await this.ProviderService.loginProvider(ProviderLoginInfo)) {
            //console.log(x);
            session.username = ProviderLoginInfo.username;
            //console.log(session.username);
            return "Provider Login Successful!";
        } else {
            return "Provider Login Failed!";
        } 

        
    }
    @Get('/signout')
    Logout(@Session() session)
    {
        if(session.destroy())
        {
            return {message: "Log out"};
        }
        else
        {
            throw new UnauthorizedException("Invalid action");
        }
    }





    @Put('upload')
    @UseGuards(SessionGuard)
    @UseInterceptors(FileInterceptor('image',
    {   
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
                cb(null, true);
            } else {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { fileSize: 300000 },
        storage:diskStorage({
            destination: './uploads',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname)
            },
        })
    }))
    uploadProvider(@UploadedFile() photoObj:Express.Multer.File, @Session() session) {
        console.log(photoObj.filename);
        const fileName = photoObj.filename;
        return this.ProviderService.uploadProvider(fileName, session.username);
    }

   

    //Provider can only search Civilian by their ID
    @Get('search/Civilian')
    @UseGuards(SessionGuard)
    getCivilianByProviderId (@Session() session) : any {
        return this.ProviderService.getCivilianByProviderId(session.username);
    }
    @Get('getAllServices')
    @UseGuards(SessionGuard)
    getAllServices (@Session() session) : any {
        return this.ProviderService.getAllServices;
    }

    @Get('/getservice/:providerid')
    getServicesByProvider(@Param('providerid', ParseIntPipe) providerid: number) {

        return this.ProviderService.getServicesByProvider(providerid);
    }

    @Put('updateinfo')
    @UsePipes(new ValidationPipe())
    @UseGuards(SessionGuard)
    updateProviderInfo(@Body() ProviderUpdateInfo:ProviderUpdateDTO, @Session() session) : any {
        console.log(ProviderUpdateInfo);
        return this.ProviderService.updateProviderInfo(ProviderUpdateInfo, session.username);
    }

    @Delete('remove')
    @UseGuards(SessionGuard)
    removeProvider(@Session() session) : any {
        return this.ProviderService.removeProvider(session.username);
    }
    
    @Delete('remove/Civilian/:CivilianId')
    @UseGuards(SessionGuard)
    removeCivilian(@Param('CivilianId', ParseIntPipe) CivilianId:number, @Session() session) : any {
        return this.ProviderService.removeCivilian(CivilianId, session.username);
    }


    @Get('/profile')
    @UseGuards(SessionGuard)
    viewProfile (@Session() session) : any {
        return this.ProviderService.viewProfile(session.username);
    }

    @Post('register/Civilian')
    @UsePipes(new ValidationPipe())
    @UseGuards(SessionGuard)
    regCivilian(@Body() CivilianRegInfo:CivilianRegDTO, @Session() session) {
        console.log(CivilianRegInfo);
        return this.ProviderService.regCivilian(CivilianRegInfo, session.username);
    }

    @Post('/addSalary')
    addSalary(@Body() salary) {
        console.log(salary);
        return this.ProviderService.addSalary(salary);
    }


    @Post('addServices')
    @UsePipes(new ValidationPipe())
    @UseGuards(SessionGuard)
    addServices(@Body()ServiceAddInfo :ServiceAddDTO, @Session() session) {
        console.log(ServiceAddInfo);
        return this.ProviderService.addServices(ServiceAddInfo, session.username);
    }


   
    @Post('sendmail/civilian')
    @UseGuards(SessionGuard)
    sendMailToCivilian (@Body() messageInfo:ProviderMessageDTO, @Session() session) {
        console.log(messageInfo);
        this.ProviderService.sendMailToCivilian(messageInfo, session.username);

        return "E-mail Send Successful!";
    }
    

}
