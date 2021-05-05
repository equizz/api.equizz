import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';

const mongooseSetup = MongooseModule.forFeatureAsync([
  {
    name: User.name,
    useFactory: () => {
      const schema = UserSchema;

      schema.pre('save', async function (done) {
        if (this.isModified('password')) {
          const hashed = await bcrypt.hash(this.get('password'), 12);
          this.set('password', hashed);
        }
        done();
      });

      schema.set('toJSON', {
        transform: (doc, ret) => {
          delete ret.password;
        },
      });

      return schema;
    },
  },
]);

@Module({
  imports: [mongooseSetup],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [mongooseSetup],
})
export class UsersModule {}
