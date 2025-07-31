'use client';

import { LinkButton, SubmitButton } from '@/components/button';
import { Input } from '@/components/input';
import { Text } from '@/components/text';
import { useToast } from '@/hooks/modal';
import { createPatient } from '@/services/patient';
import { useRouter } from 'next/navigation';

export default function RegisterPatientPage() {
  const { openToast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const name = form.get('name') as string;
    const birth = form.get('birth') as string;
    const register = form.get('register') as string;

    if (name.trim() === '' || birth.trim() === '' || register.trim() === '') {
      openToast({
        type: 'error',
        message: '모든 필드를 입력해주세요.',
      });
      return;
    }

    const { success, error } = await createPatient(form);

    if (!success) {
      openToast({
        type: 'error',
        message: `환자 등록에 실패했습니다: ${error}`,
      });
      return;
    }

    openToast({
      type: 'success',
      message: '환자가 성공적으로 등록되었습니다.',
    });
    router.push('/admin/patient');
  };

  return (
    <div className="flex flex-col gap-8">
      <Text.TITLE text="관리자 - 환자 등록" />

      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="name">
            <Text.HEADING text="이름" />
          </label>
          <Input.TEXT
            id="name"
            name="name"
            placeholder="이름을 입력하세요"
            required
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="birth">
            <Text.HEADING text="생년월일" />
          </label>
          <Input.TEXT
            id="birth"
            name="birth"
            placeholder="생년월일을 입력하세요"
            required
            min={6}
            minLength={6}
            max={6}
            maxLength={6}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="register">
            <Text.HEADING text="등록번호" />
          </label>
          <Input.TEXT
            id="register"
            name="register"
            placeholder="등록번호를 입력하세요"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <SubmitButton text="등록하기" />
          <LinkButton.GRAY text="취소하기" href="/admin/patient" />
        </div>
      </form>
    </div>
  );
}
