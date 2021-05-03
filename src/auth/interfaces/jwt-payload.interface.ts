import { Role } from 'src/enums/user.enum';

export interface JWT {
  userId: string;
  username: string;
  role: Role;
}
