import { Text } from '@/components/text';
import { Wrapper } from '@/components/wrapper';
import { IUserModel } from '@/services/user';

interface IProps {
  userInfo: IUserModel;
}

export default function Profile(props: IProps) {
  const { userInfo } = props;

  return (
    <Wrapper.SECTION text="프로필">
      <div className="flex items-center gap-2">
        <Text.PARAGRAPH text="이름:" />
        <Text.HEADING text={userInfo.name} />
      </div>
      <div className="flex items-center gap-2">
        <Text.PARAGRAPH text="생년월일:" />
        <Text.HEADING text={userInfo.birth || '미등록'} />
      </div>
      <div className="flex items-center gap-2">
        <Text.PARAGRAPH text="등록번호:" />
        <Text.HEADING text={userInfo.registerNumber || '미등록'} />
      </div>
    </Wrapper.SECTION>
  );
}
