import { ProviderEntity } from "src/provider/provider.entity";
export declare class BankingEntity {
    id: number;
    accountName: string;
    accountNumber: string;
    branch: string;
    routingNumber: number;
    ProviderID: number;
    Provider: ProviderEntity;
}
