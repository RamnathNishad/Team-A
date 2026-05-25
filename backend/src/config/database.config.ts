import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '@/users/entities/user.entity';
import { Otp } from '@/auth/entities/otp.entity';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DB_HOST', 'localhost'),
  port: configService.get('DB_PORT', 5432),
  username: configService.get('DB_USERNAME', 'smartloan'),
  password: configService.get('DB_PASSWORD', 'smartloan_pass_123'),
  database: configService.get('DB_DATABASE', 'smartloan_db'),
  entities: [User, Otp],
  synchronize: configService.get('DB_SYNCHRONIZE', true),
  logging: configService.get('DB_LOGGING', true),
  dropSchema: false,
});
