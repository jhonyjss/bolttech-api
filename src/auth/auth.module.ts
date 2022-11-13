import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || `hardtoDisc0ver`,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],

  controllers: [AuthController],
})
export class AuthModule {}
