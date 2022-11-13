import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { LoginDto } from './../users/dto/login.dto';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/register')
  async register(@Body() createUsersDto: CreateUserDto) {
    return await this.usersService.create(createUsersDto);
  }

  @UseGuards(JwtGuard)
  @Get('/teste')
  teste() {
    return 'teste';
  }
}
