import { addWeight, getWeights, getUser } from "./actions";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Weight({ params }: any) {
  const userId = Number(params.id);
  const user = await getUser(userId);
  const weights = await getWeights(userId);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">사용자 상세 정보</h1>
      {user ? (
        <div className="mb-4">
          <div>이름: {user.name}</div>
          <div>나이: {user.age}</div>
        </div>
      ) : (
        <div>사용자 정보를 찾을 수 없습니다.</div>
      )}

      <form
        action={async (formData) => {
          "use server";
          const weight = Number(formData.get("weight"));
          await addWeight(userId, weight);
          redirect(`/weight/${userId}`);
        }}
        className="mb-8 flex gap-2"
      >
        <input type="number" name="weight" placeholder="몸무게(kg)" className="p-2 border rounded" required />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded">
          등록
        </button>
      </form>

      <h2 className="text-xl font-bold mb-2">과거 몸무게 기록</h2>
      <div className="w-80 h-64 overflow-y-auto border rounded mb-8">
        {weights.length === 0 ? (
          <p className="text-gray-400 p-4">기록이 없습니다.</p>
        ) : (
          <ul>
            {weights.map((w) => (
              <li key={w.id} className="p-2 border-b">
                {w.weight}kg ({new Date(w.created_at).toLocaleString()})
              </li>
            ))}
          </ul>
        )}
      </div>

      <Link href="/" className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
