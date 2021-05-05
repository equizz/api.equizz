import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Command } from 'nestjs-command';
import { Role } from 'src/enums/user.enum';

@Injectable()
export class UserSeed {
  constructor(private readonly usersService: UsersService) {}

  @Command({
    command: 'create:user',
    describe: 'create a user',
    autoExit: true,
  })
  async create() {
    const user = await this.usersService.create({
      username: 'pram',
      password: 'pramsworld',
      role: Role.Admin,
      email: 'bangsad.teroris@gmail.com',
    });

    console.log('asd');
  }
}
