import { UserEmailType, UserStatus, UserType } from '@/shared/enum/user';

export interface IUserModel {
  id: number;
  uuid: string;
  type: UserType;
  email: string;
  email_type: UserEmailType;
  name: string;
  image: string | null;
  birth: string;
  registerNumber: string;
  status: UserStatus;
  created_at: string;
  updated_at: string;
}
