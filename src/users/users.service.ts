import { LoginDto } from 'src/users/dto/login.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.create(createUserDto);
    if (!user) {
      throw new HttpException(
        { message: 'Usuário não encontrado' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.usersRepository
      .save(user)
      .then((res) => console.log(res))
      .catch((err) => {
        switch (err.code) {
          case 'ER_DUP_ENTRY':
            throw new HttpException(
              { message: 'Usuário já registrado' },
              HttpStatus.BAD_REQUEST,
            );

          default:
            throw new HttpException(
              { message: err.message },
              HttpStatus.BAD_REQUEST,
            );
        }
      });
  }

  findAll() {
    return `This action returns all users`;
  }

  async findByEmail(email: string): Promise<Users> {
    try {
      return await this.usersRepository.findOne({
        where: { email },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
