'use server';

import { serverClient } from '@/lib/supabase';
import { ERROR_CODE } from '@/shared/const';
import { IResponseType } from '@/types';
import { INoticeModel } from '../model/notice.model';
import { getKSTDate } from '@/utils';

interface IProps extends Pick<INoticeModel, 'title' | 'content'> {
  noticeId: number;
}

export async function updateNoticeAction(
  props: IProps,
): Promise<IResponseType<null>> {
  const { title, content, noticeId } = props;

  const supabase = await serverClient();

  const { data, error } = await supabase
    .from('notice')
    .update({
      title,
      content,
      updatedAt: getKSTDate(),
    })
    .eq('id', noticeId);

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
