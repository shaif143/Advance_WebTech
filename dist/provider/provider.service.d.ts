import { CivilianRegDTO } from "src/civilian/civilian.dto";
import { CivilianEntity } from "src/civilian/civilian.entity";
import { SalaryEntity } from "src/salary/salary.entity";
import { Repository } from "typeorm";
import { ProviderMessageDTO, ProviderLoginDTO, ProviderRegDTO, ProviderUpdateDTO } from "./provider.dto";
import { ProviderEntity } from "./provider.entity";
import { ServiceAddDTO } from "src/service/service.dto";
import { ServiceEntity } from "src/service/service.entity";
import { MailerService } from "@nestjs-modules/mailer/dist";
export declare class ProviderService {
    private ProviderRepo;
    private CivilianRepo;
    private ServiceRepo;
    private SalaryRepo;
    private readonly mailerService;
    constructor(ProviderRepo: Repository<ProviderEntity>, CivilianRepo: Repository<CivilianEntity>, ServiceRepo: Repository<ServiceEntity>, SalaryRepo: Repository<SalaryEntity>, mailerService: MailerService);
    regProvider(ProviderRegInfo: ProviderRegDTO): Promise<ProviderEntity>;
    loginProvider(ProviderLoginInfo: ProviderLoginDTO): Promise<boolean>;
    uploadProvider(fileName: string, username: string): Promise<"Provider Photo Uploaded!" | "Provider Photo Couldn't be Uploaded!">;
    getCivilianByProviderId(ProviderUsername: string): Promise<ProviderEntity[]>;
    updateProviderInfo(ProviderUpdateInfo: ProviderUpdateDTO, ProviderUsername: string): Promise<ProviderEntity>;
    removeProvider(ProviderUsername: string): Promise<void>;
    removeCivilian(CivilianId: number, ProviderUsername: string): Promise<"Civilian Deleted!" | "Couldn't Delete!">;
    viewProfile(ProviderUsername: string): Promise<ProviderEntity[]>;
    regCivilian(CivilianRegInfo: CivilianRegDTO, ProviderUsername: string): Promise<CivilianEntity>;
    addSalary(salary: any): Promise<SalaryEntity>;
    addServices(ServiceAddInfo: ServiceAddDTO, ProviderUsername: string): Promise<ServiceEntity>;
    getAllServices(): Promise<ServiceEntity[]>;
    getServicesByProvider(providerid: number): Promise<ProviderEntity[]>;
    sendMailToCivilian(messageInfo: ProviderMessageDTO, providerUsername: string): Promise<void>;
    Logout(session: any, username: string): Promise<string>;
}
