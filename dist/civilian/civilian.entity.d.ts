import { ProviderEntity } from "src/provider/provider.entity";
export declare class CivilianEntity {
    id: number;
    name: string;
    username: string;
    email: string;
    contact: number;
    age: number;
    gender: string;
    profession: string;
    ProviderID: number;
    Provider: ProviderEntity;
}
