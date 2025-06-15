import { getUser, getWeightsToday } from "./actions";
import dayjs from "dayjs";
import WeightRegister from "./WeightRegister";
import HomeButton from "@/components/button/HomeButton";
import Delete from "./Delete";
import { formatBirthDate } from "@/util/birth-format";
import Image from "next/image";

function WeightCell({
  weight,
  image,
}: {
  weight?: number | null;
  image?: string | null;
}) {
  if (weight) {
    return `${weight}kg`;
  }

  if (image) {
    return (
      <div className="flex justify-center items-center gap-2">
        <Image
          src={image}
          alt="weight image"
          width={100}
          height={100}
          className="w-24 h-24 object-cover rounded-lg"
        />
      </div>
    );
  }

  return "-";
}

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await getUser(Number(id));
  const weights = await getWeightsToday(Number(id));

  console.log("weights", weights);

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl">환자 정보</h1>

        {user ? (
          <div className="flex flex-col gap-4 my-4">
            <div className="flex text-3xl">
              <p className="min-w-[140px] text">이름:</p>
              <strong className="text-4xl">{user?.name || "-"}</strong>
            </div>
            <div className="flex text-3xl">
              <p className="min-w-[140px]">생년월일:</p>
              <strong className="text-4xl">
                {formatBirthDate(user?.birth)}
              </strong>
            </div>
            <div className="flex text-3xl">
              <p className="min-w-[140px]">등록번호:</p>
              <strong className="text-4xl">{user?.register || "-"}</strong>
            </div>
          </div>
        ) : (
          <p>사용자 정보를 찾을 수 없습니다.</p>
        )}
      </div>

      {user && <WeightRegister userId={Number(id)} user={user} />}

      <div className="flex flex-col gap-4">
        <h1 className="text-4xl">몸무게 기록</h1>

        <table>
          <thead>
            <tr>
              <th>몸무게</th>
              <th>시간</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {weights.length > 0 ? (
              weights.map((w) => {
                return (
                  <tr key={w.id} className="hover:bg-gray-100">
                    <td>
                      <WeightCell weight={w.weight} image={w.image} />
                    </td>
                    <td>
                      {dayjs(w.created_at)
                        .tz("Asia/Seoul")
                        .format("HH시 mm분")}{" "}
                    </td>
                    <td>
                      <Delete weight={w} />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={3}>기록이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <HomeButton />
    </div>
  );
}
