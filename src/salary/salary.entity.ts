import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { ProviderEntity } from "src/provider/provider.entity";

@Entity("Salary Information")
export class SalaryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length:80, unique:true})
  username:string;

  @Column()
  salary: string;

  @Column({nullable:true})
  ProviderID:number; 

  

  @OneToOne(() => ProviderEntity, Provider => Provider.salary)
  Provider: ProviderEntity;

  
}
