'use server';

import { serverClient } from '@/lib/supabase';
import { IUserModel } from '../model';

interface IProps {
  userId: string;
}

interface IGetUserInfoResponse {
  success: boolean;
  data: IUserModel | null;
  error?: string;
}

export const getUserInfoByUserId = async (
  props: IProps,
): Promise<IGetUserInfoResponse> => {
  try {
    const { userId } = props;

    if (!userId) {
      return {
        success: false,
        data: null,
        error: 'User ID is required',
      };
    }

    const supabase = await serverClient();

    const { data, error } = await supabase
      .from('user')
      .select('*, weight!inner(*)')
      .eq('id', userId)
      .single<IUserModel>();

    if (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }

    if (!data) {
      return {
        success: false,
        data: null,
        error: 'User not found',
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
