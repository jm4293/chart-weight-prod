import { getUser, getWeightsToday } from "./actions";
import dayjs from "dayjs";
import Detail from "./Detail";
import HomeButton from "@/components/button/HomeButton";
import Delete from "./Delete";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const userId = Number(id);
  const user = await getUser(userId);
  const weights = await getWeightsToday(userId);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold">환자 정보</h1>

        {user ? (
          <div className="flex flex-col gap-1 mb-4">
            <div className="flex text-xl">
              <p className="min-w-[90px]">이름:</p>
              <p>{user?.name || "-"}</p>
            </div>
            <div className="flex text-xl">
              <p className="min-w-[90px]">생년월일:</p>
              <p>{user?.birth || "-"}</p>
            </div>
            <div className="flex text-xl">
              <p className="min-w-[90px]">등록번호:</p>
              <p>{user?.register || "-"}</p>
            </div>
          </div>
        ) : (
          <div>사용자 정보를 찾을 수 없습니다.</div>
        )}
      </div>

      <Detail userId={userId} />

      <div>
        <h1 className="text-2xl font-bold mb-1">몸무게 기록</h1>

        {weights.length === 0 ? (
          <p className=" text-gray-600">기록이 없습니다.</p>
        ) : (
          <ul className="h-[30vh] overflow-y-auto border rounded">
            {weights.map((w) => {
              return (
                <li key={w.id} className="flex justify-between items-center">
                  <p className="text-xl">{w.weight}kg</p>

                  <div className="flex items-center gap-4">
                    <div>{dayjs(w.created_at).tz("Asia/Seoul").format("HH시 mm분")}</div>
                    <Delete weightId={w.id} />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <HomeButton />
    </div>
  );
}
