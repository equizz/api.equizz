import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { sessionExtractor } from 'src/common/helpers/session.helper';
import { JWT } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: sessionExtractor,
      ignoreExpiration: false,
      secretOrKey: 'asd',
    });
  }

  async validate(payload): Promise<JWT> {
    // ? Passport will build a user object(`req.user`) based on the return value of our validate() method
    return {
      userId: payload.userId,
      username: payload.username,
      role: payload.role,
    };
  }
}
