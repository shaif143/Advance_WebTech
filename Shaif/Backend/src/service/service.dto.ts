import { IsInt, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class ServiceAddDTO {
    id:number;

    //@IsNotEmpty({message: "Service name must be provided!"})
    serviceType:string;
    

    @IsNotEmpty({message: "Contact must be provided!"})
    contact:number;

    
    latitude:string;

   
    longitude:string;

    usefullLinks:string;

    ProviderID:number;
}