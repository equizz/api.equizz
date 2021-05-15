import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { sessionExtractor } from 'src/common/helpers/session.helper';
import { JwtConfig } from 'src/common/interfaces/jwtconfig.interface';
import { IUser } from 'src/common/interfaces/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: sessionExtractor,
      ignoreExpiration: false,
      secretOrKey: configService.get<JwtConfig>('JWT_KEY'),
    });
  }

  async validate(payload): Promise<IUser> {
    // ? Passport will build a user object(`req.user`) based on the return value of our validate() method
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}
