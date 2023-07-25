import { ProviderEntity } from "src/provider/provider.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Service Table')
export class ServiceEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    servicetype:string;

    @Column({length:80, unique:true})
    username:string;

    @Column()
    contact:number;
   
    @Column()
    usefullinks:string;
    
    @Column({nullable:true})
    ProviderID:number;

    @ManyToOne(() => ProviderEntity, Provider => Provider.Services, {onDelete:"CASCADE"})
    @JoinColumn({name:'ProviderID'})
        Provider:ProviderEntity;
}
