import { ProviderEntity } from "src/provider/provider.entity";
export declare class ServiceEntity {
    id: number;
    serviceType: string;
    contact: number;
    usefullLinks: string;
    latitude: string;
    longitude: string;
    ProviderID: number;
    Provider: ProviderEntity;
}
