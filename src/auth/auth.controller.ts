import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

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
    return this.authService.login(req.user);
  }
}
