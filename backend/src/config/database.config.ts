import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { User } from '@/users/entities/user.entity';
import { Otp } from '@/auth/entities/otp.entity';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const isProduction = configService.get('NODE_ENV') === 'production';
  
  // Use SQLite for development/testing
  return {
    type: 'sqlite',
    database: path.join(process.cwd(), 'smartloan.db'),
    entities: [User, Otp],
    synchronize: true,
    logging: false,
    dropSchema: false,
  };
};
