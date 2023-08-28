import { ProviderEntity } from "src/provider/provider.entity";

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Service Table')
export class ServiceEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    serviceType:string;

    @Column()
    contact:number;
   
    @Column()
    usefullLinks:string;

    @Column({nullable:true})
    latitude:string;

    @Column({nullable:true})
    longitude:string;
    
    @Column({nullable:true})
    ProviderID:number;

    @ManyToOne(() => ProviderEntity, Provider => Provider.Services, {onDelete:"CASCADE"})
    @JoinColumn({name:'ProviderID'})
    Provider:ProviderEntity;

}
