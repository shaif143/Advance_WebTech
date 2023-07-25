import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServiceEntity } from "src/service/service.entity";
import { CivilianEntity } from "src/civilian/civilian.entity";
import { ProviderController } from "./provider.controller";
import { ProviderEntity } from "./provider.entity";
import { ProviderService } from "./provider.service";
import { SalaryEntity } from "src/salary/salary.entity";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
  imports: [TypeOrmModule.forFeature([ProviderEntity, CivilianEntity, ServiceEntity,SalaryEntity]),MailerModule.forRoot(
    {
        transport: {
            host: 'smtp.gmail.com',
            port: 465,
            ignoreTLS: true,
            secure: true,
            auth: {
                user: 'daruchinicheradip@gmail.com',
                pass: 'dxyekyeighltfntb'
            }
        }
    }
)],
  controllers: [ProviderController],
  providers: [ProviderService]
})

export class ProviderModule {}