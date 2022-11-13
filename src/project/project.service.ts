import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    try {
      const project = await this.projectRepo.create(createProjectDto);
      if (!project) {
        throw new HttpException(
          { message: 'Usuário não encontrado' },
          HttpStatus.FORBIDDEN,
        );
      }

      return await this.projectRepo.save(project);
    } catch (error) {
      throw new HttpException({ message: error.message }, HttpStatus.FORBIDDEN);
    }
  }

  findAll() {
    return `This action returns all project`;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
