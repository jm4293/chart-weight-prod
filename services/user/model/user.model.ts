import { IWeightModel } from '@/services/weight';
import { UserEmailType, UserStatus, UserType } from '@/shared/enum/user';

export interface IUserModel {
  id: number;
  uuid: string;
  type: UserType;
  email: string;
  emailType: UserEmailType;
  name: string;
  image: string | null;
  birth: string | null;
  registerNumber: string | null;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date | null;

  weight: IWeightModel[];
}
