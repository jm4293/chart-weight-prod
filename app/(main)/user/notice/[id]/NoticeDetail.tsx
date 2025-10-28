'use client';

import { Text, Textarea } from '@/components/text';
import { Wrapper } from '@/components/wrapper';
import { useNotice, useNoticeMutation } from '@/services/notice';
import Link from 'next/link';

interface IProps {
  noticeId: string;
}

export default function NoticeDetail(props: IProps) {
  const { noticeId } = props;

  const { data } = useNotice(Number(noticeId));

  const { deleteNotice } = useNoticeMutation();

  const handleDelete = () => {
    if (confirm('공지사항을 삭제하시겠습니까?')) {
      deleteNotice.mutate(Number(noticeId));
    }
  };

  return (
    <>
      <Wrapper.SECTION>
        <div className="flex items-center gap-2">
          <Text.PARAGRAPH text="제목" />
          <input type="text" name="title" defaultValue={data?.title} disabled />
        </div>
        <div className="flex items-center gap-2">
          <Text.PARAGRAPH text="내용" />
          <Textarea
            name="content"
            title="내용"
            defaultValue={data?.content}
            disabled
          />
        </div>
      </Wrapper.SECTION>
      <Wrapper.SECTION>
        <div className="flex items-center gap-2">
          <Text.PARAGRAPH text="작성일" />
          <input
            type="text"
            name="createdAt"
            defaultValue={data?.createdAt.toString().slice(0, 10)}
            disabled
          />
        </div>
        <div className="flex items-center gap-2">
          <Text.PARAGRAPH text="작성자" />
          <input
            type="text"
            name="author"
            defaultValue={data?.user?.name}
            disabled
          />
        </div>
      </Wrapper.SECTION>
      <Wrapper.SECTION>
        <div className="flex justify-end gap-2">
          <div className="cursor-pointer" onClick={handleDelete}>
            <Text.PARAGRAPH text="삭제하기" className="text-red-500" />
          </div>
          <Link href={`/user/notice/${noticeId}/modify`}>
            <Text.PARAGRAPH text="수정하기" className="text-blue-500" />
          </Link>
        </div>
      </Wrapper.SECTION>
    </>
  );
}
