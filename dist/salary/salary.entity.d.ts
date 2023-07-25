import { ProviderEntity } from "src/provider/provider.entity";
export declare class SalaryEntity {
    id: number;
    username: string;
    salary: string;
    ProviderID: number;
    Provider: ProviderEntity;
}
