import { Role } from '../../enums/user.enum';

export interface IUser {
  userId: string;
  username: string;
  role: Role;
}
