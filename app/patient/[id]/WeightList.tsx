"use client";

import { usePatient } from "@/hook/patient";
import Loading from "@/components/loading/Loading";
import WeightDelete from "@/app/patient/[id]/WeightDelete";

interface IProps {
  id: string;
}

export default function WeightList(props: IProps) {
  const { id } = props;

  const { data, isLoading, isSuccess, isError } = usePatient({ id });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <p className="text-red-500 p-4">
        몸무게 기록을 불러오는 데 실패했습니다.
      </p>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th>몸무게</th>
          <th>시간</th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
        {isSuccess && data.patient.weights.length > 0 ? (
          data.patient.weights.map((weight) => {
            return (
              <tr key={weight.id} className="hover:bg-gray-100">
                <td>
                  <div className="flex justify-center items-center gap-2">
                    {weight.weight && `${weight.weight}kg`}
                    {weight.file_name && (
                      <img
                        className="w-24 h-24 object-cover rounded-lg"
                        src={`http://localhost:5007/uploads/${weight.file_name}`}
                        alt="weight image"
                      />
                    )}
                  </div>
                </td>
                <td>
                  {new Date(weight.created_at).toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>
                  <WeightDelete patient_id={id} weight={weight} />
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={3} className="text-center">
              기록이 없습니다.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
