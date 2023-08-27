/// <reference types="multer" />
import { ServiceAddDTO } from "src/service/service.dto";
import { CivilianRegDTO } from "src/civilian/civilian.dto";
import { BankInfoDTO } from "src/bankingDetails/bankinfo.dto";
import { ProviderLoginDTO, ProviderMessageDTO, ProviderRegDTO, ProviderUpdateDTO } from "./provider.dto";
import { ProviderService } from "./provider.service";
import { BankingEntity } from "src/bankingDetails/bankinfo.entity";
import { ServiceEntity } from "src/service/service.entity";
import { EmailEntity } from "./email-log.entity";
import { Repository } from "typeorm";
import { CivilianEntity } from "src/civilian/civilian.entity";
export declare class ProviderController {
    private readonly ProviderService;
    private readonly emailLogRepository;
    constructor(ProviderService: ProviderService, emailLogRepository: Repository<EmailEntity>);
    regProvider(providerRegInfo: ProviderRegDTO): Promise<string>;
    loginProvider(ProviderLoginInfo: ProviderLoginDTO, session: any): Promise<any>;
    uploadProvider(photoObj: Express.Multer.File, session: any): Promise<"Provider Photo Uploaded!" | "Provider Photo Couldn't be Uploaded!">;
    getProviderPhoto(filename: string, res: any): Promise<any>;
    getLoggedInProviderPhoto(session: any, res: any): Promise<any>;
    viewProviderProfile(session: any): Promise<"Provider not found!" | {
        id: number;
        name: string;
        email: string;
        contact: number;
    }>;
    updateProviderInfo(ProviderUpdateInfo: ProviderUpdateDTO, session: any): any;
    addServices(ServiceAddInfo: ServiceAddDTO, session: any): any;
    addBankInfo(addBankInfo: BankInfoDTO, session: any): any;
    regCivilian(CivilianRegInfo: CivilianRegDTO, session: any): any;
    sendMailToCivilian(messageInfo: ProviderMessageDTO, session: any): string;
    viewNotification(session: any): Promise<ServiceEntity[]>;
    viewBankInfo(session: any): Promise<BankingEntity[]>;
    viewCivilian(session: any): Promise<CivilianEntity[]>;
    viewEmails(session: any): Promise<EmailEntity[]>;
    removeProvider(session: any): any;
    getCivilianById(CivilianId: number, session: any): any;
    removeCivilian(CivilianId: number, session: any): any;
    logoutManager(req: any): boolean;
}
