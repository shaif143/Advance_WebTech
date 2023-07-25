import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SalaryEntity } from "./salary.entity";

@Module({
    imports: [TypeOrmModule.forFeature([SalaryEntity])],
    controllers: [],
    providers: []
})

export class SalaryModule {}