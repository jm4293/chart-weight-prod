import { ErrorCode } from '@/shared/const';

export interface IResponseType<T> {
  success: boolean;
  data: T | null;
  error?: string;
  code?: ErrorCode;
}
