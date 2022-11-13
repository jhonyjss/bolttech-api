import { Task } from './entities/task.entity';
import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProjectDto } from 'src/project/dto/update-project.dto';
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

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<string> {
    try {
      const task = await this.taskRepo.findOne({
        where: { id },
      });
      if (!task) {
        throw new NotFoundException('Task not found');
      }

      await this.taskRepo.save({
        ...task,
        ...updateProjectDto,
      });
      return `Task id:${id} updated`;
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number): Promise<string> {
    try {
      await this.taskRepo.delete(id);
      return `Task id:${id} removed`;
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
