'use client';

import { useToast } from '@/hooks/modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createNoticeAction,
  deleteNoticeAction,
  updateNoticeAction,
} from '../action';
import { QUERY_KEY } from '@/shared/queryKey';
import { useRouter } from 'next/navigation';
import { Variable } from 'lucide-react';

export const useNoticeMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { openToast } = useToast();

  const createNotice = useMutation({
    mutationFn: async (data: {
      title: string;
      content: string;
      userId: number;
    }) => {
      const { success, code } = await createNoticeAction(data);

      if (!success) {
        throw new Error(code || '공지사항 등록 중 오류가 발생했습니다.');
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY.NOTICE.LIST(),
      });

      openToast({
        type: 'success',
        message: '공지사항이 성공적으로 등록되었습니다.',
      });
      router.push('/user/notice');
    },
    onError: (error: Error) => {
      openToast({
        type: 'error',
        message: error.message || '공지사항 등록 중 오류가 발생했습니다.',
      });
    },
  });

  const updateNotice = useMutation({
    mutationFn: async (data: {
      noticeId: number;
      title: string;
      content: string;
    }) => {
      const { success, code } = await updateNoticeAction(data);

      if (!success) {
        throw new Error(code || '공지사항 수정 중 오류가 발생했습니다.');
      }
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY.NOTICE.LIST(),
      });
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY.NOTICE.DETAIL(variables.noticeId),
      });

      openToast({
        type: 'success',
        message: '공지사항이 성공적으로 수정되었습니다.',
      });
      router.push('/user/notice');
    },
    onError: (error: Error) => {
      openToast({
        type: 'error',
        message: error.message || '공지사항 수정 중 오류가 발생했습니다.',
      });
    },
  });

  const deleteNotice = useMutation({
    mutationFn: async (noticeId: number) => {
      const { success, error } = await deleteNoticeAction(noticeId);

      if (!success) {
        throw new Error(error || '공지사항 삭제 중 오류가 발생했습니다.');
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY.NOTICE.LIST(),
      });

      openToast({
        type: 'success',
        message: '공지사항이 성공적으로 삭제되었습니다.',
      });
      router.push('/user/notice');
    },
    onError: (error: Error) => {
      openToast({
        type: 'error',
        message: error.message || '공지사항 삭제 중 오류가 발생했습니다.',
      });
    },
  });

  return {
    createNotice,
    updateNotice,
    deleteNotice,
  };
};
