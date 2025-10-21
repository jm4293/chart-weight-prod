import { UserEmailType } from '@/shared/enum/user';

export interface IUserOAuthTokenModel {
  id: string;
  uuid: string;
  provider: UserEmailType;
  accessToken: string;
  accessTokenExpiresIn: string;
  refreshToken: string;
  refreshTokenExpiresIn: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}
