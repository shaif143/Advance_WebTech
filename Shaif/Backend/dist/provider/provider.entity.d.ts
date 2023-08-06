import { ServiceEntity } from "src/service/service.entity";
import { CivilianEntity } from "src/civilian/civilian.entity";
import { SalaryEntity } from "src/salary/salary.entity";
export declare class ProviderEntity {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    contact: number;
    photoFileName: string;
    Civilians: CivilianEntity[];
    salary: SalaryEntity[];
    Services: ServiceEntity[];
}
