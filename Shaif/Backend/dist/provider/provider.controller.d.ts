/// <reference types="multer" />
import { ServiceAddDTO } from "src/service/service.dto";
import { CivilianRegDTO } from "src/civilian/civilian.dto";
import { ProviderLoginDTO, ProviderMessageDTO, ProviderRegDTO, ProviderUpdateDTO } from "./provider.dto";
import { ProviderService } from "./provider.service";
import { SalaryEntity } from "src/salary/salary.entity";
import { ProviderEntity } from "./provider.entity";
import { ServiceEntity } from "src/service/service.entity";
export declare class ProviderController {
    private readonly ProviderService;
    constructor(ProviderService: ProviderService);
    gethellow(): any;
    regProvider(ProviderRegInfo: ProviderRegDTO): any;
    loginProvider(ProviderLoginInfo: ProviderLoginDTO, session: any): Promise<"Provider Login Successful!" | "Provider Login Failed!">;
    Logout(session: any): {
        message: string;
    };
    uploadProvider(photoObj: Express.Multer.File, session: any): Promise<"Provider Photo Uploaded!" | "Provider Photo Couldn't be Uploaded!">;
    getCivilianByProviderId(session: any): any;
    getAllServices(session: any): Promise<ServiceEntity[]>;
    getServicesByProvider(providerid: number): Promise<ProviderEntity[]>;
    updateProviderInfo(ProviderUpdateInfo: ProviderUpdateDTO, session: any): any;
    removeProvider(session: any): any;
    removeCivilian(CivilianId: number, session: any): any;
    viewProfile(session: any): any;
    regCivilian(CivilianRegInfo: CivilianRegDTO, session: any): Promise<import("../civilian/civilian.entity").CivilianEntity>;
    addSalary(salary: any): Promise<SalaryEntity>;
    addServices(ServiceAddInfo: ServiceAddDTO, session: any): Promise<ServiceEntity>;
    sendMailToCivilian(messageInfo: ProviderMessageDTO, session: any): string;
}
