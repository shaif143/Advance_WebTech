import { ServiceEntity } from "src/service/service.entity";
import { CivilianEntity } from "src/civilian/civilian.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SalaryEntity } from "src/salary/salary.entity";
//import { NotificationEntity } from './notification.entity';


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
    contact:number;
    @Column()
    password:string;
    @Column({nullable:true})
    photoFileName:string;

    @OneToMany(() => CivilianEntity, Civilian => Civilian.Provider, {cascade: ["remove"]})
        Civilians:CivilianEntity[];
    
    @OneToOne(() => SalaryEntity, salary => salary.Provider)
        salary: SalaryEntity[];


    @OneToMany(() => ServiceEntity, Service => Service.Provider, {cascade: ["remove"]})
        
        Services: ServiceEntity[];

    /*@OneToMany(() => NotificationEntity, notification => notification.provider)
        notification: ProviderEntity[];*/

        
    
    
}