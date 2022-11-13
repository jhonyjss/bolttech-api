import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

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
        const { email } = this.jwtService.verify(token) as {
          name: string;
          email: string;
        };

        return !!email;
      }
    } catch (error) {
      res
        .status(401)
        .json({ message: 'unauthorized, try to authenticate again.' });
    }
    next();
  }

  /*  const Authorization = request.get('Authorization');

    if (Authorization) {
      const token = Authorization.replace('Bearer ', '');
      const { userId, firstName } = this.jwtService.verify(token) as {
        userId: string;
        firstName: string;
      };

      return !!userId;
    } */
}
