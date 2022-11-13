import { Task } from './entities/task.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const project = await this.taskRepo.create(createTaskDto);
      if (!project) {
        throw new HttpException(
          { message: 'Bad request' },
          HttpStatus.FORBIDDEN,
        );
      }

      return await this.taskRepo.save(project);
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.FORBIDDEN);
    }
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
