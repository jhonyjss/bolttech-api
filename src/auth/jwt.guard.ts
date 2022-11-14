import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
@Injectable()
export class JwtGuard implements CanActivate {
  constructor(readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const [req, res, next] = context.getArgs();
    try {
      const Authorization = req.get('Authorization');
      if (Authorization) {
        const token = Authorization.replace('Bearer ', '');
        const isVerified = this.jwtService.verify(token);

        return isVerified;
      }
    } catch (error) {
      res
        .status(401)
        .json({ message: 'unauthorized, try to authenticate again.' });
    }
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
