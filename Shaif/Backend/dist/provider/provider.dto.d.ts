export declare class ProviderRegDTO {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    contact: number;
}
export declare class ProviderLoginDTO {
    username: string;
    password: string;
}
export declare class DeleteQry {
    ProviderId: number;
    travelerId: number;
}
export declare class ProviderUpdateDTO {
    id: number;
    name: string;
    email: string;
    contact: number;
    password: string;
}
export declare class ProviderInfoDTO {
    id: number;
    name: string;
    email: string;
    contact: number;
}
export declare class ProviderMessageDTO {
    subject: string;
    message: string;
}
