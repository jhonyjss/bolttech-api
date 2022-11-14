import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || `hardtoDisc0ver`,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([Task]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
