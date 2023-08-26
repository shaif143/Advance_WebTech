import { ProviderEntity } from "src/provider/provider.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Civilian')
export class CivilianEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column({length:80, unique:true})
    username:string;
    @Column()
    email:string;
    @Column()
    contact:number;
    @Column()
    age:number;
    @Column()
    profession:string;
    @Column({nullable:true})
    ProviderID:number;

    @ManyToOne(() => ProviderEntity, Provider => Provider.Civilians, {onDelete:"CASCADE"})
    @JoinColumn({name:'ProviderID'})
        Provider:ProviderEntity;
}
