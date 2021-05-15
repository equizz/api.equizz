import { Role } from 'src/enums/user.enum';

export interface JWT {
  sub: string;
  username: string;
  role: Role;
}
