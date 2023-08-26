import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderModule } from './provider/provider.module';
import { ServiceModule } from './service/service.module';
import { CivilianModule } from './civilian/civilian.module';
import { BankingModule } from './bankingDetails/bankinfo.module';
import { typeOrmConfig } from './config/typeorm.config';




@Module({
  imports: [ProviderModule, ServiceModule, CivilianModule, BankingModule, TypeOrmModule.forRoot(typeOrmConfig),],
  controllers: [],
  providers: [],
})

export class AppModule {}
