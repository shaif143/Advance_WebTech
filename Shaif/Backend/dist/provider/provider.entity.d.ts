import { ServiceEntity } from "src/service/service.entity";
import { CivilianEntity } from "src/civilian/civilian.entity";
import { BankingEntity } from "src/bankingDetails/bankinfo.entity";
export declare class ProviderEntity {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    contact: number;
    photoFileName: string;
    Civilians: CivilianEntity[];
    bankinfo: BankingEntity;
    Services: ServiceEntity[];
}
