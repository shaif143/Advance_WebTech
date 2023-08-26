import { ConflictException, Inject, Injectable, NotFoundException, Provider, Session } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CivilianRegDTO } from "src/civilian/civilian.dto";
import { CivilianEntity } from "src/civilian/civilian.entity";
import { BankingEntity } from "src/bankingDetails/bankinfo.entity";
import { Repository } from "typeorm";
import { DeleteQry, ProviderInfoDTO, ProviderMessageDTO, ProviderLoginDTO, ProviderRegDTO, ProviderUpdateDTO } from "./provider.dto";
import { ProviderEntity } from "./provider.entity";
import * as bcrypt from 'bcrypt';
import { ServiceAddDTO } from "src/service/service.dto";
import { ServiceEntity } from "src/service/service.entity";
import { BankInfoDTO } from "src/bankingDetails/bankinfo.dto";
import { MailerService } from "@nestjs-modules/mailer/dist";
import { EmailEntity } from "./email-log.entity";





@Injectable()
export class ProviderService {
    constructor (
        @InjectRepository(ProviderEntity)
            private ProviderRepo:Repository<ProviderEntity>,
        @InjectRepository(CivilianEntity)
            private CivilianRepo:Repository<CivilianEntity>,
        @InjectRepository(ServiceEntity)
            private ServiceRepo:Repository<ServiceEntity>,
        @InjectRepository(BankingEntity)
            private BankRepo:Repository<BankingEntity>,
        //@InjectRepository(ProviderInfoEntity)

        private readonly mailerService: MailerService,
        @InjectRepository(EmailEntity)
        private readonly EmailRepo: Repository<EmailEntity>,
   
        
    ) {}

    async regProvider (ProviderRegInfo:ProviderRegDTO) : Promise<ProviderEntity> {
        const salt = await bcrypt.genSalt();
        ProviderRegInfo.password = await bcrypt.hash(ProviderRegInfo.password, salt);

        return this.ProviderRepo.save(ProviderRegInfo);
        
    }

    

    async loginProvider (ProviderLoginInfo:ProviderLoginDTO) {
        const Provider = await this.ProviderRepo.findOneBy({username:ProviderLoginInfo.username});
        
        if (Provider != null) {
        const isMatch:boolean = await bcrypt.compare(ProviderLoginInfo.password, Provider.password);
        console.log(isMatch);
        return isMatch;
        }else{
            return false;
        }

        
    }

    async uploadProvider(fileName: string, username: string) {
        const Provider = await this.ProviderRepo.findOneBy({ username: username });
        console.log(username);
        if (Provider) {
            Provider.photoFileName = fileName;
            await this.ProviderRepo.save(Provider);
            return "Provider Photo Uploaded!";
        }
        return "Provider Photo Couldn't be Uploaded!";
    }


    async getProviderPhotoFileName(username: string): Promise<string | null> {
        const provider = await this.ProviderRepo.findOneBy({ username });
        if (provider && provider.photoFileName) {
            return provider.photoFileName;
        }
        return null;
    }

    
    async viewProviderProfile (ProviderUsername:string) {
        console.log(ProviderUsername);
        const Provider = await this.ProviderRepo.findOneBy({username:ProviderUsername});
        

        if (Provider) {
            const { id, name, email, contact } = Provider;
            return { id, name, email, contact };
        }
    
        return "Provider not found!";
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


    async addServices (ServiceAddInfo: ServiceAddDTO, ProviderUsername:string) : Promise<ServiceEntity> {
        const Provider = await this.ProviderRepo.findOneBy({username:ProviderUsername});
      
        ServiceAddInfo.ProviderID = Provider.id;

        return this.ServiceRepo.save(ServiceAddInfo);
    }


    async addBankInfo (addBankInfo: BankInfoDTO, ProviderUsername:string) : Promise<BankingEntity> {
        const Provider = await this.ProviderRepo.findOneBy({username:ProviderUsername});
      
        addBankInfo.ProviderID = Provider.id;

        return this.BankRepo.save(addBankInfo);
    }


    async regCivilian (CivilianRegInfo:CivilianRegDTO, ProviderUsername:string) : Promise<CivilianEntity> {
        const Provider = await this.ProviderRepo.findOneBy({username:ProviderUsername});
      

        CivilianRegInfo.ProviderID = Provider.id;

        return this.CivilianRepo.save(CivilianRegInfo);
    }



    async sendMailToCivilian(messageInfo: ProviderMessageDTO, providerUsername: string) {
        const provider = await this.ProviderRepo.findOneBy({ username: providerUsername });

       
        await this.mailerService.sendMail({
          to: messageInfo.receiver,
          subject: 'Civilian ' + provider.name + ' : ' + messageInfo.subject,
          text: messageInfo.message,
        });
    
        // Save the email log to the database
        const emailLog = this.EmailRepo.create({
          senderUsername: providerUsername,
          receiver: messageInfo.receiver,
          subject: messageInfo.subject,
          message: messageInfo.message,
        });
        await this.EmailRepo.save(emailLog);

        
      }





    //  async addBankInfo(addBankInfo: BankInfoDTO, ProviderUsername:string) : Promise<BankingEntity | string> {
    //     const info = await this.ProviderRepo.find({

    //         where: { username: ProviderUsername },
      
    //         relations: {
      
    //           bankinfo: true,
      
    //         },
      
    //       });

    //       if(info[0]=null){
    //         const Provider = await this.ProviderRepo.findOneBy({username:ProviderUsername});

    //         const bankInfo: BankingEntity = new BankingEntity();
    //         bankInfo.accountName = addBankInfo.accountName;
    //         bankInfo.accountNumber = addBankInfo.accountNumber;
    //         bankInfo.branch = addBankInfo.branch;
    //         bankInfo.routingNumber = addBankInfo.routingNumber;
           
   
    //         bankInfo.Provider = Provider;
    //         addBankInfo.ProviderID= Provider.id;
    //         return this.BankRepo.save(bankInfo);
            
            

    //       }else{

    //         return "error";
              

    //       }
         
    //  }


     





   



    async viewService(username: string): Promise<ServiceEntity[]> {
        const provider = await this.ProviderRepo.findOne({ where: { username } })

        const Services = await this.ServiceRepo.find({
          where: {
            Provider: provider,
          },
        });
      
        return Services;
      }


      async viewBankInfo(username: string): Promise<BankingEntity[]> {
        const provider = await this.ProviderRepo.findOne({ where: { username } })

        const Information = await this.BankRepo.find({
          where: {
            Provider: provider,
          },
        });
      
        return Information;
      }



      async viewCivilian(username: string): Promise<CivilianEntity[]> {
        const provider = await this.ProviderRepo.findOne({ where: { username } })

        const civilian = await this.CivilianRepo.find({
          where: {
            Provider: provider,
          },
        });
      
        return civilian;
      }


      async viewEmails(providerUsername: string): Promise<EmailEntity[]> {
        return this.EmailRepo.find({
          where: {
            senderUsername: providerUsername,
          },
          order: {
            sentAt: 'DESC', // You can change the sorting order as needed
          },
        });
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


  

   


    



    // async Logout(@Session() session) {
      
      
    //     session.destroy();
    //     return "Logout Successfully";
    
  


    // }
}


