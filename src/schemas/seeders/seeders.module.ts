import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { AppModule } from 'src/app.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { UserSeed } from './users/user.seed';

@Module({
  imports: [CommandModule, UsersModule, AppModule],
  providers: [UserSeed, UsersService],
})
export class SeedersModule {}
