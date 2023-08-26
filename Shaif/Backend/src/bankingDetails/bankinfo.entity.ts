import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { ProviderEntity } from "src/provider/provider.entity";

@Entity("Banking Details")
export class BankingEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountName:string;

  @Column({unique:true})
  accountNumber:string;

  @Column()
  branch:string;

  @Column()
  routingNumber:number;

   @Column({nullable:true})
   ProviderID:number; 

  
  @OneToOne(() => ProviderEntity, (Provider) => Provider.bankinfo, {onDelete:"CASCADE"}) // specify inverse side as a second parameter
  @JoinColumn({name:'ProviderID'})  
  Provider: ProviderEntity

  /*@OneToOne(() => ProviderEntity, Provider => Provider.bankinfo)
  Provider: ProviderEntity;*/

  
}
