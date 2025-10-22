import { LinkButton } from '@/components/button';
import { Text } from '@/components/text';

export default function CatchAllPage() {
  return (
    <div className="flex flex-col gap-8">
      <Text.TITLE text="잘못된 경로입니다." />

      <div className="flex flex-col gap-2">
        <Text.HEADING text="존재하지 않는 페이지입니다." />
        <LinkButton.BLUE href="/main" text="메인 페이지로 이동" />
      </div>
    </div>
  );
}
