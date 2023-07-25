import { ProviderEntity } from "src/provider/provider.entity";
export declare class ServiceEntity {
    id: number;
    servicetype: string;
    username: string;
    contact: number;
    usefullinks: string;
    ProviderID: number;
    Provider: ProviderEntity;
}
