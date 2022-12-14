import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy {
  constructor(private readonly authService: AuthService) {}

  async validate(payload: any) {
    const pl = payload.user;
    const user = await this.authService.validateUser(pl);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return pl;
  }
}
