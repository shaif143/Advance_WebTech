import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BankingEntity } from "./bankinfo.entity";

@Module({
    imports: [TypeOrmModule.forFeature([BankingEntity])],
    controllers: [],
    providers: []
})

export class BankingModule {}