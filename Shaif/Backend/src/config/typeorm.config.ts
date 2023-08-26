import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {

    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123',
    database: 'emergency_helpline_db',
    autoLoadEntities: true,
    synchronize: true,
}