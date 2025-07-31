import { LinkButton, SubmitButton } from '@/components/button';
import { Input } from '@/components/input';
import { Text } from '@/components/text';
import { getPatient, updatePatient } from '@/services/patient';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function AdminPatientModifyPage(props: IProps) {
  const { params } = props;
  const { id } = await params;

  const patient = await getPatient(id);

  const handleSubmit = updatePatient.bind(null, id);

  if (!patient) {
    return (
      <div className="flex flex-col gap-8">
        <Text.TITLE text="관리자 - 환자 상세" />
        <Text.HEADING text="환자를 찾을 수 없습니다." />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <Text.TITLE text="관리자 - 환자 수정" />

      <form className="flex flex-col gap-8" action={handleSubmit}>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="name">
            <Text.HEADING text="이름" />
          </label>
          <Input.TEXT
            id="name"
            name="name"
            defaultValue={patient.name}
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
            defaultValue={patient.birth}
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
            defaultValue={patient.register}
            placeholder="등록번호를 입력하세요"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <SubmitButton text="수정하기" />
          <LinkButton.GRAY text="취소하기" href={`/admin/account/${id}`} />
        </div>
      </form>
    </div>
  );
}
