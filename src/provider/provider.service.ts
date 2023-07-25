import { Inject, Injectable, NotFoundException, Provider, Session } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CivilianRegDTO } from "src/civilian/civilian.dto";
import { CivilianEntity } from "src/civilian/civilian.entity";
import { SalaryEntity } from "src/salary/salary.entity";
import { Repository } from "typeorm";
import { DeleteQry, ProviderInfoDTO, ProviderMessageDTO, ProviderLoginDTO, ProviderRegDTO, ProviderUpdateDTO } from "./provider.dto";
import { ProviderEntity } from "./provider.entity";
import * as bcrypt from 'bcrypt';
import { ServiceAddDTO } from "src/service/service.dto";
import { ServiceEntity } from "src/service/service.entity";
import { SalaryDTO } from "src/salary/salary.dto";
import { MailerService } from "@nestjs-modules/mailer/dist";


@Injectable()
export class ProviderService {
    constructor (
        @InjectRepository(ProviderEntity)
            private ProviderRepo:Repository<ProviderEntity>,
        @InjectRepository(CivilianEntity)
            private CivilianRepo:Repository<CivilianEntity>,
        @InjectRepository(ServiceEntity)
            private ServiceRepo:Repository<ServiceEntity>,
        @InjectRepository(SalaryEntity)
            private SalaryRepo:Repository<SalaryEntity>,
        //@InjectRepository(ProviderInfoEntity)
 
            private readonly mailerService:MailerService
       
    ) {}

    async regProvider (ProviderRegInfo:ProviderRegDTO) : Promise<ProviderEntity> {
        const salt = await bcrypt.genSalt();
        ProviderRegInfo.password = await bcrypt.hash(ProviderRegInfo.password, salt);

        return this.ProviderRepo.save(ProviderRegInfo);
        
    }

    

    async loginProvider (ProviderLoginInfo:ProviderLoginDTO) {
        const Provider = await this.ProviderRepo.findOneBy({username:ProviderLoginInfo.username});
        
        const isMatch:boolean = await bcrypt.compare(ProviderLoginInfo.password, Provider.password);
        console.log(isMatch);
        return isMatch;

        
    }

    async uploadProvider (fileName:string, username:string) {
        const Provider = await this.ProviderRepo.findOneBy({username:username});
        console.log(username);
        if (Provider) {
            Provider.photoFileName = fileName;
            await this.ProviderRepo.save(Provider);
            return "Provider Photo Uploaded!";
        }
        return "Provider Photo Couldn't be Uploaded!";
    }


  

    async getCivilianByProviderId (ProviderUsername:string) {
        console.log(ProviderUsername);
        const Provider = await this.ProviderRepo.findOneBy({username:ProviderUsername});
        const ProviderId = Provider.id;

        return this.ProviderRepo.find(
            {
                where: {id:ProviderId},
                relations: {Civilians:true}
            }
        ) 
    }

    async updateProviderInfo (ProviderUpdateInfo:ProviderUpdateDTO, ProviderUsername:string) : Promise<ProviderEntity> {
        const Provider = await this.ProviderRepo.findOneBy({username:ProviderUsername});
        ProviderUpdateInfo.id = Provider.id;

        const salt = await bcrypt.genSalt();
        ProviderUpdateInfo.password = await bcrypt.hash(ProviderUpdateInfo.password, salt);

        await this.ProviderRepo.update({id:Provider.id}, ProviderUpdateInfo);
        console.log("update!");
        return this.ProviderRepo.findOneBy({id:Provider.id});
    }

    async removeProvider (ProviderUsername:string) {
        const Provider = await this.ProviderRepo.findOneBy({username:ProviderUsername});
        await this.ProviderRepo.delete(Provider.id);
    }

   

    async removeCivilian (CivilianId:number, ProviderUsername:string) {
        

        const Civilian = await this.CivilianRepo.findOneBy({id:CivilianId});
        const Provider = await this.ProviderRepo.findOneBy({username:ProviderUsername});
        const ProviderId = Provider.id;

        if (Civilian.ProviderID == ProviderId) {
            await this.CivilianRepo.delete(CivilianId);
            return "Civilian Deleted!";
        } else {
            return "Couldn't Delete!";
        }
    }

    async viewProfile (ProviderUsername:string) {
        console.log(ProviderUsername);
        const Provider = await this.ProviderRepo.findOneBy({username:ProviderUsername});
        const ProviderId = Provider.id;

        return this.ProviderRepo.find(
            {
                where: {id:ProviderId}
            }
        ) 
    }

    async regCivilian (CivilianRegInfo:CivilianRegDTO, ProviderUsername:string) : Promise<CivilianEntity> {
        const Provider = await this.ProviderRepo.findOneBy({username:ProviderUsername});
      

        CivilianRegInfo.ProviderID = Provider.id;

        return this.CivilianRepo.save(CivilianRegInfo);
    }

    
    async addSalary(salary): Promise<SalaryEntity> {
        return this.SalaryRepo.save(salary);
    }

   


    async addServices (ServiceAddInfo: ServiceAddDTO, ProviderUsername:string) : Promise<ServiceEntity> {
        const Provider = await this.ProviderRepo.findOneBy({username:ProviderUsername});
      

        ServiceAddInfo.ProviderID = Provider.id;

        return this.ServiceRepo.save(ServiceAddInfo);
    }


    async getAllServices(): Promise<ServiceEntity[]> {
        return this.ServiceRepo.find();
    }
    async getServicesByProvider(providerid: number): Promise<ProviderEntity[]> {
        return this.ProviderRepo.find({
            where: { id: providerid },
            relations: {
                Services: true,
            },
        });
    }

    async sendMailToCivilian (messageInfo:ProviderMessageDTO, providerUsername:string) {
        const provider = await this.ProviderRepo.findOneBy({username:providerUsername});
        const providerName = provider.name;

        await this.mailerService.sendMail(
            {
                to: "daruchinicheradip@gmail.com",
                subject: "Civilian " + providerName + " : " + messageInfo.subject,
                text: messageInfo.message,
            }
        );
    }


      async Logout(@Session() session, username: string) {
        const Search = await this.ProviderRepo.find({
          select: {
            name: true,
            id: true,
            password: false
          },
          where: {
            username: username,
          }
        });
      
      
        session.destroy();
        return "Logout Successfully";
      }
  


}


