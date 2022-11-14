import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './project/project.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TaskModule } from './task/task.module';
import ormconfig from './../config/orm.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || `hardtoDisc0ver`,
      signOptions: { expiresIn: '5m' },
    }),
    TypeOrmModule.forRoot(ormconfig),
    ProjectModule,
    AuthModule,
    UsersModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
