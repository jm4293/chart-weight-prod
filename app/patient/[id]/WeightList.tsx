"use client";

import { usePatient } from "@/hook/patient";
import Loading from "@/components/loading/Loading";
import WeightDelete from "@/app/patient/[id]/WeightDelete";
import { IWeightModel } from "@/type/model/weight";

interface IProps {
  id: string;
}

export default function WeightList(props: IProps) {
  const { id } = props;

  const { data, isLoading, isSuccess, isError } = usePatient({ id });

  const handleTableRowClick = (params: {
    event: React.MouseEvent<HTMLTableRowElement>;
    weight: IWeightModel;
  }) => {
    const { event, weight } = params;
    const { file_name } = weight;

    if (file_name) {
      event.stopPropagation();
      window.open(
        `${process.env.NEXT_PUBLIC_API_URL}/uploads/${file_name}`,
        "_blank",
      );
    }
  };

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
              <tr
                key={weight.id}
                className={`hover:bg-gray-100 ${weight.file_name ? " cursor-pointer" : ""}`}
                onClick={(event) => handleTableRowClick({ event, weight })}
              >
                <td>
                  <div className="flex justify-center items-center gap-2">
                    {weight.weight && `${weight.weight}kg`}
                    {weight.file_name && (
                      <img
                        className="w-24 h-24 object-cover rounded-lg"
                        src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${weight.file_name}`}
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
