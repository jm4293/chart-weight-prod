import { getUser, getWeightsToday } from "./actions";
import dayjs from "dayjs";
import Detail from "./WeightRegister";
import HomeButton from "@/components/button/HomeButton";
import Delete from "./Delete";
import { formatBirthDate } from "@/util/birth-format";

export default async function DetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const userId = Number(id);
  const user = await getUser(userId);
  const weights = await getWeightsToday(userId);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">환자 정보</h1>

        {user ? (
          <div className="flex flex-col gap-1 mb-4">
            <div className="flex text-xl">
              <p className="min-w-[100px]">이름:</p>
              <strong>{user?.name || "-"}</strong>
            </div>
            <div className="flex text-xl">
              <p className="min-w-[100px]">생년월일:</p>
              <strong>{formatBirthDate(user?.birth)}</strong>
            </div>
            <div className="flex text-xl">
              <p className="min-w-[100px]">등록번호:</p>
              <strong>{user?.register || "-"}</strong>
            </div>
          </div>
        ) : (
          <p>사용자 정보를 찾을 수 없습니다.</p>
        )}
      </div>

      <Detail userId={userId} />

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">몸무게 기록</h1>

        {weights.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>
                  <strong>몸무게</strong>
                </th>
                <th>
                  <strong>시간</strong>
                </th>
                <th>
                  <strong>삭제</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              {weights.map((w) => {
                return (
                  <tr key={w.id} className="hover:bg-gray-100">
                    <td className="text-xl">{w.weight}kg</td>
                    <td>{dayjs(w.created_at).tz("Asia/Seoul").format("HH시 mm분")}</td>
                    <td>
                      <Delete weightId={w.id} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <table>
            <thead>
              <tr>
                <th>몸무게</th>
                <th>시간</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={3}>기록이 없습니다.</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <HomeButton />
    </div>
  );
}
