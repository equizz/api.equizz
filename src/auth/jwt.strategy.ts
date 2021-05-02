import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: sessionExtractor,
      ignoreExpiration: false,
      secretOrKey: 'asd',
    });
  }

  async validate(payload) {
    return { userId: payload.sub, username: payload.username };
  }
}

const sessionExtractor = (req) => {
  let jwt = null;
  if (req && req.session) {
    jwt = req.session.jwt;
  }
  return jwt;
};
