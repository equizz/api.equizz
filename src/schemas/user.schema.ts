import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true, minlength: 4, maxlength: 14 })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, minlength: 6 })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
