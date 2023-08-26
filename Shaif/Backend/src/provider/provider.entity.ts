import { ServiceEntity } from "src/service/service.entity";
import { CivilianEntity } from "src/civilian/civilian.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { BankingEntity } from "src/bankingDetails/bankinfo.entity";
import { EmailEntity } from "./email-log.entity";



@Entity('Provider')
export class ProviderEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({length:150})
    name:string;

    @Column({length:80, unique:true})
    username:string;

    @Column()
    email:string;
    @Column()
    
    password:string;
    @Column()
    contact:number;
   
    @Column({nullable:true})
    photoFileName:string;

    @OneToMany(() => CivilianEntity, Civilian => Civilian.Provider, {cascade: ["remove"]})
    Civilians:CivilianEntity[];

      




    @OneToOne(() => BankingEntity, (bankinfo) => bankinfo.Provider, {cascade: ["remove"]}) // specify inverse side as a second parameter
    bankinfo: BankingEntity   
    


    @OneToMany(() => ServiceEntity, Service => Service.Provider, {cascade: ["remove"]})
        
        Services: ServiceEntity[]; 
    
}