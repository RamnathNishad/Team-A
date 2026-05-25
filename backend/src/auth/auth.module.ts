import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './services/auth.service';
import { OtpService } from './services/otp.service';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Otp } from './entities/otp.entity';
import { User } from '@/users/entities/user.entity';
import { UserService } from '@/users/services/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Otp, User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRATION', '7d'),
        },
      }),
    }),
  ],
  providers: [AuthService, OtpService, JwtStrategy, JwtAuthGuard, UserService],
  controllers: [AuthController],
  exports: [AuthService, JwtAuthGuard, UserService],
})
export class AuthModule {}
