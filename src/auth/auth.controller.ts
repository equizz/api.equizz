import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    /*
    ? Passport automatically creates a user object, 
    ? based on the value we return from the validate() method, 
    ? and assigns it to the Request object as req.user
    */
    return this.authService.login(req.user, req.session);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  getTest(@Request() req) {
    console.log(req.session.jwt);
    return req.user;
  }
}
