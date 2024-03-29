import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/common/interfaces/user.interface';
import { Role } from 'src/enums/user.enum';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingEmail = await this.userModel.findOne({
      email: createUserDto.email,
    });
    const existingUsername = await this.userModel.findOne({
      username: createUserDto.username,
    });

    if (existingEmail || existingUsername)
      throw new BadRequestException('Email or Username in use');

    const createdUser = new this.userModel(createUserDto);

    return createdUser.save();
  }

  async findAll(role?: Role[]): Promise<User[]> {
    if (role) return this.userModel.find({ role: { $in: role } });

    return this.userModel.find();
  }

  async findOne(username: string, role?: Role[]): Promise<User> {
    if (role) {
      return this.userModel.findOne({
        username,
        role: { $in: role },
      });
    }

    return this.userModel.findOne({ username });
  }

  async update(username: string, updateUserDto: UpdateUserDto, updater: IUser) {
    const user = await this.userModel.findOne({ username });

    if (!user) throw new NotFoundException('User not found');

    if (updater.role === Role.Siswa && user.role !== Role.Siswa)
      throw new UnauthorizedException();

    if (updater.role === Role.Guru && user.role === Role.Admin)
      throw new UnauthorizedException();

    if (
      updater.role === Role.Guru &&
      user.role === Role.Guru &&
      updater.username !== user.username
    )
      throw new UnauthorizedException();

    if (
      updater.role === Role.Siswa &&
      user.role === Role.Siswa &&
      updater.username !== user.username
    )
      throw new UnauthorizedException();

    try {
      user.set({
        username: updateUserDto.username,
        email: updateUserDto.email,
      });

      await user.save();
    } catch (e) {
      // Duplicate key error code
      if (e.code === 11000)
        throw new BadRequestException('Username or email already exists');
    }

    return user;
  }

  async remove(username: string) {
    const user = await this.userModel.findOne({ username });

    return user.remove();
  }
}
