import { addWeight, getWeights, getUser } from "./actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import WeightForm from "./WeighForm";

export default async function Weight({ params }: any) {
  const userId = Number(params.id);
  const user = await getUser(userId);
  const weights = await getWeights(userId);

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold mb-4">사용자 상세 정보</h1>
      {user ? (
        <div className="mb-4">
          <div>이름: {user.name}</div>
          <div>나이: {user.age}</div>
        </div>
      ) : (
        <div>사용자 정보를 찾을 수 없습니다.</div>
      )}

      <WeightForm userId={userId} />

      <h2 className="text-xl font-bold mb-2">몸무게 기록</h2>

      <div className="w-80 h-64 overflow-y-auto border rounded">
        {weights.length === 0 ? (
          <p className="text-gray-400 p-4">기록이 없습니다.</p>
        ) : (
          <ul>
            {weights.map((w) => {
              const date = new Date(w.created_at);
              const year = String(date.getFullYear()).slice(2);
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const day = String(date.getDate()).padStart(2, "0");
              const hour = String(date.getHours()).padStart(2, "0");
              const minute = String(date.getMinutes()).padStart(2, "0");

              return (
                <li key={w.id} className="p-2 border-b">
                  <div className="flex justify-between items-center">
                    <div>{w.weight}kg</div>
                    <div>({`${year}.${month}.${day} ${hour}:${minute}`})</div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <Link
        href="/"
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors w-80 text-center"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
