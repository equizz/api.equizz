import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Role } from '../enums/user.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true, minlength: 4, maxlength: 14 })
  @ApiProperty()
  username: string;

  @Prop({ required: true, unique: true })
  @ApiProperty()
  email: string;

  @Prop({ required: true, minlength: 6 })
  @ApiProperty()
  password: string;

  @Prop({ required: true, enum: Role })
  @ApiProperty()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
