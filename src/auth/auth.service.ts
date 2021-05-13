import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JWT } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userModel.findOne({ username });

    const passwordsMatch = await bcrypt.compare(pass, user.password);

    if (!passwordsMatch) return false; // ? return false because i handled error in local-auth-guard.ts

    return user;
  }

  async login(user): Promise<JWT> {
    return { username: user.username, userId: user._id, role: user.role };
  }
}
