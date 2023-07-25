import { IsEmail, IsInt, IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";

export class ServiceAddDTO {
    id:number;
    
    @IsString({message: "Invalid Name"})
    @Matches(/^[a-z A-Z]+$/, {message:"Use Valid Name Format"})
    @MaxLength(200)
    servicetype:string;

    @IsString({message: "Invalid Name"})
    @Matches(/^[a-zA-Z0-9@._$]+$/, {message:"Use Valid Username Format"})
    username:string;

    @IsInt({message: "Invalid Contact!"})
    contact:number;



    @IsString({message: "Invalid Name!"})
    usefullinks:string;

    ProviderID:number;
}