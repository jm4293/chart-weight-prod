import { Text } from '@/components/text';
import { getAccount } from '@/services/account';
import { LinkButton } from '@/components/button';
import { AccountStatusLabels, AccountTypeLabels } from '@/shared/enum/account';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function AdminAccountDetailPage(props: IProps) {
  const { params } = props;
  const { id } = await params;

  const account = await getAccount(id);

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
      <Text.TITLE text="관리자 - 계정 상세" />

      <div className="flex flex-col gap-2">
        <Text.HEADING text={`이름: ${account.name}`} />
        <Text.HEADING text={`이메일: ${account.email}`} />
        <Text.HEADING text={`타입: ${AccountTypeLabels[account.type]}`} />
        <Text.HEADING
          text={`계정 상태: ${AccountStatusLabels[account.status]}`}
        />
      </div>

      <LinkButton.BLUE text="계정 수정" href={`/admin/account/${id}/modify`} />
    </div>
  );
}
