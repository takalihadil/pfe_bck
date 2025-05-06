import { Module } from '@nestjs/common';
import { AuthService } from './users.service';
import { AuthController } from './users.controller'; // Corrigé ici
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy],
  exports: [AuthService, JwtModule], // Exporter AuthService si utilisé ailleurs
})
export class AuthModule {}
