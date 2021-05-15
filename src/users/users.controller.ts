import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Role } from 'src/enums/user.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto, @Request() req) {
    const { role } = req.user;

    if (role === Role.Siswa) throw new UnauthorizedException();

    if (role === Role.Guru && createUserDto.role !== Role.Siswa)
      throw new UnauthorizedException();

    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const { role } = req.user;

    if (role === Role.Guru || role === Role.Siswa)
      return this.usersService.findAll([Role.Siswa, Role.Guru]);

    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async findOne(@Param('username') username: string, @Request() req) {
    const { role } = req.user;

    if (role === Role.Guru || role === Role.Siswa) {
      return this.usersService.findOne(username, [Role.Siswa, Role.Guru]);
    }

    return this.usersService.findOne(username);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':username')
  update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    return this.usersService.update(username, updateUserDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':username')
  remove(@Param('username') username: string, @Request() req) {
    const { role } = req.user;

    if (role !== Role.Admin) throw new UnauthorizedException();

    return this.usersService.remove(username);
  }
}
