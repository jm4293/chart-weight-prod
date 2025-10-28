'use server';

import { serverClient } from '@/lib/supabase';
import { IResponseType } from '@/types';
import { INoticeModel } from '../model';
import { ERROR_CODE } from '@/shared/const';

export async function getNotice(
  noticeId: number,
): Promise<IResponseType<INoticeModel | null>> {
  const supabase = await serverClient();

  const { data, error } = await supabase
    .from('notice')
    .select('* , user(*)')
    .eq('id', noticeId)
    .single<INoticeModel>();

  if (error) {
    return {
      success: false,
      data: null,
      error: error.message,
      code: ERROR_CODE.DATABASE_ERROR,
    };
  }

  return {
    success: true,
    data,
  };
}
