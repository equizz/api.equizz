import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JWT } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userModel.findOne({ username });

    if (!user) throw new BadRequestException('Invalid credentials');

    const passwordsMatch = await bcrypt.compare(pass, user.password);

    if (!passwordsMatch) throw new BadRequestException('Invalid credentials');

    return user;
  }

  async login(user): Promise<JWT> {
    return { username: user.username, userId: user._id, role: user.role };
  }
}
