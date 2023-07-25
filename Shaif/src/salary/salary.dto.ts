import { IsString, Matches } from "class-validator";


export class SalaryDTO {
    id:number;
    
    @IsString({message: "Invalid Name"})
    @Matches(/^[a-zA-Z0-9@._$]+$/, {message:"Use Valid Username Format"})
    username:string;
   
    salary:string;

    ProviderID:number;
}