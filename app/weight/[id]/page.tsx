import { getWeights, getUser } from "./actions";
import Link from "next/link";
import WeightForm from "./WeighForm";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/ko";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ko");

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const userId = Number(id);
  const user = await getUser(userId);
  const weights = await getWeights(userId);

  return (
    <div className="desktop w-full h-[100vh] px-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold my-8">사용자 상세 정보</h1>

      <div className="w-full">
        {user ? (
          <div className="mb-4">
            <div className="text-xl">이름: {user.name}</div>
            <div className="text-xl">나이: {user.age}</div>
          </div>
        ) : (
          <div>사용자 정보를 찾을 수 없습니다.</div>
        )}
      </div>

      <WeightForm userId={userId} />

      <h2 className="text-xl font-bold mb-8">몸무게 기록</h2>

      <div className="w-full h-80 max-h-80 overflow-y-auto border rounded">
        {weights.length === 0 ? (
          <p className="text-gray-400 p-4">기록이 없습니다.</p>
        ) : (
          <ul>
            {weights.map((w) => {
              return (
                <li key={w.id} className="px-4 py-2 border-b">
                  <div className="flex justify-between items-center">
                    <div>{w.weight}kg</div>
                    <div>({dayjs(w.created_at).tz("Asia/Seoul").format("YY.MM.DD HH:mm")} )</div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <Link
        href="/"
        className="w-full mt-4 bg-gray-500 text-white p-4 rounded hover:bg-gray-600 transition-colors text-center"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
