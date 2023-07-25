import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServiceEntity } from "./service.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ServiceEntity])],
    controllers: [],
    providers: []
})

export class ServiceModule {}