'use server';

import { serverClient } from '@/lib/supabase';
import { IResponseType } from '@/types';

export async function deleteNoticeAction(
  noticeId: number,
): Promise<IResponseType<null>> {
  const supabase = await serverClient();

  const { data, error } = await supabase
    .from('notice')
    .delete()
    .eq('id', noticeId);

  if (error) {
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }

  return {
    success: true,
    data: null,
  };
}
