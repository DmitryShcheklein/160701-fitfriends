import { UserRole } from '@project/enums';

export interface TokenPayload {
  sub: string;
  email: string;
  firstName: string;
  role: UserRole;
}
