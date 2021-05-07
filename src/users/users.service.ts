import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async findAll(role?): Promise<User[]> {
    if (role) return this.userModel.find({ role: { $in: role } });

    return this.userModel.find();
  }

  async findOne(username: string): Promise<User> {
    const existingUser = await this.userModel.findOne({ username });

    if (!existingUser) throw new NotFoundException('User not found');

    return existingUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
