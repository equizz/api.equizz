import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
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

const sessionExtractor = (req): string => {
  let jwt = null;
  if (req && req.session) {
    jwt = req.session.jwt;
  }
  return jwt;
};
