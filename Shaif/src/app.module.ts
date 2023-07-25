import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderModule } from './provider/provider.module';
import { ServiceModule } from './service/service.module';
import { CivilianModule } from './civilian/civilian.module';
import { SalaryModule } from './salary/salary.module';

@Module({
  imports: [ProviderModule, ServiceModule, CivilianModule, SalaryModule, TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'emergency_helpline_db',
      autoLoadEntities: true,
      synchronize: true,
    }
  )],
  controllers: [],
  providers: [],
})

export class AppModule {}
