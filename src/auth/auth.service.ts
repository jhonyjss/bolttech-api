import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/users/dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    try {
      const user = await this.usersService.findByEmail(email);

      if (!user) {
        throw new Error('Not found');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Password wrong');
      }

      // generate and sign token
      const token = this.createTokenJWT(user);
      return {
        user: user,
        ...token,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async validateUser(payload: any) {
    const user = await this.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async findByPayload({ email }: LoginDto): Promise<LoginDto> {
    return await this.usersService.findByEmail(email);
  }

  private createTokenJWT(user) {
    const payload = { user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
