'use client';

import { Button } from '@/components/button';
import { Text, Textarea } from '@/components/text';
import { Wrapper } from '@/components/wrapper';
import { useToast } from '@/hooks/modal';
import { useNoticeMutation } from '@/services/notice';
import { IUserModel } from '@/services/user';

interface IProps {
  userInfo: IUserModel;
}

export default function NoticeRegister(props: IProps) {
  const { userInfo } = props;

  const { createNotice } = useNoticeMutation();

  const { openToast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    if (!title || !title.trim()) {
      openToast({ message: '제목을 입력해주세요.', type: 'error' });
      return;
    }

    if (!content || !content.trim()) {
      openToast({ message: '내용을 입력해주세요.', type: 'error' });
      return;
    }

    createNotice.mutate({ title, content, userId: userInfo.id });
  };

  return (
    <Wrapper.SECTION>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Text.PARAGRAPH text="제목" />
          <input type="text" name="title" />
        </div>
        <div className="flex items-center gap-2">
          <Text.PARAGRAPH text="내용" />
          <Textarea name="content" title="내용" />
        </div>
        <Button color="blue" type="submit" text="등록하기" />
      </form>
    </Wrapper.SECTION>
  );
}
