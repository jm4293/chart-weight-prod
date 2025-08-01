import { LinkButton, SubmitButton } from '@/components/button';
import { Input } from '@/components/input';
import { Select } from '@/components/select';
import { Text } from '@/components/text';
import { getAccount, updateAccount } from '@/services/account';
import { AccountStatusLabels, AccountTypeLabels } from '@/shared/enum/account';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function AdminAccountModifyPage(props: IProps) {
  const { params } = props;
  const { id } = await params;

  const account = await getAccount(id);

  const handleSubmit = updateAccount.bind(null, id);

  if (!account) {
    return (
      <div className="flex flex-col gap-8">
        <Text.TITLE text="관리자 - 계정 상세" />
        <Text.HEADING text="계정을 찾을 수 없습니다." />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <Text.TITLE text="관리자 - 계정 수정" />

      <form className="flex flex-col gap-8" action={handleSubmit}>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="name">
            <Text.HEADING text="이름" />
          </label>
          <Input.TEXT
            id="name"
            name="name"
            defaultValue={account.name}
            placeholder="이름을 입력하세요"
            required
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="email">
            <Text.HEADING text="이메일" />
          </label>
          <Text.HEADING text={account.email} />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="type">
            <Text.HEADING text="타입" />
          </label>
          <Text.HEADING text={AccountTypeLabels[account.type]} />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="status">
            <Text.HEADING text="상태" />
          </label>
          <Select
            id="status"
            name="status"
            defaultValue={account.status}
            options={Object.entries(AccountStatusLabels).map(
              ([key, value]) => ({
                value: key,
                label: value,
              }),
            )}
            placeholder="상태를 선택하세요"
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
