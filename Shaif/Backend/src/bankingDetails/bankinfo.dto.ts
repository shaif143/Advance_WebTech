import { IsNotEmpty, IsString, Matches } from "class-validator";


export class BankInfoDTO {
    id:number;
    
    @IsString({message: "Invalid Account Name"})
    //@Matches(/^[a-zA-Z0-9]/, {message:"Please enter a valid account name"})
    accountName:string;

    @IsNotEmpty({message:"Please enter a valid account number"})
    accountNumber:string;

    @IsNotEmpty({message:"Please enter the branch name"})
    branch:string;

    @IsNotEmpty({message:"Please enter the routing number"})
    routingNumber:number;

    ProviderID:number;
}