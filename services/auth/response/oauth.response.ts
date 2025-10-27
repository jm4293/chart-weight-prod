import { UserEmailType } from '@/shared/enum/user';

export interface IOAuthResponse {
  user: {
    email: string;
    name: string;
    image: string | null;
    emailType: UserEmailType;
  };
  token: {
    token_type: string;
    access_token: string;
    access_token_expires_in: string;
    refresh_token: string;
    refresh_token_expires_in: string | null;
  };
}
