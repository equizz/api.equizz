import {
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { JWT } from './interfaces/jwt-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Request() req): Promise<JWT> {
    /*
    ? Passport automatically creates a user object, 
    ? based on the value we return from the validate() method, 
    ? and assigns it to the Request object as req.user
    */
    const { user } = req;

    const payload = await this.authService.login(user);

    const userJwt = this.jwtService.sign(payload);

    req.session.jwt = userJwt;

    return payload;
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  getTest(@Request() req) {
    return req.user;
  }
}
