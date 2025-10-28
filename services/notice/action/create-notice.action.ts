'use server';

import { serverClient } from '@/lib/supabase';
import { ERROR_CODE } from '@/shared/const';
import { IResponseType } from '@/types';
import { INoticeModel } from '../model/notice.model';

interface IProps extends Pick<INoticeModel, 'title' | 'content'> {
  userId: number;
}

export async function createNoticeAction(
  props: IProps,
): Promise<IResponseType<null>> {
  const { title, content, userId } = props;

  const supabase = await serverClient();

  const { data, error } = await supabase.from('notice').insert({
    userId,
    title,
    content,
    status: 1,
  });

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
    data: null,
  };
}
