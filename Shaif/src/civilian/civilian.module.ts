import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CivilianEntity } from "./civilian.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CivilianEntity])],
    controllers: [],
    providers: []
})

export class CivilianModule {}