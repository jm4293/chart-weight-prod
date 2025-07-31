'use client';

import WeightDelete from '@/app/patient/[id]/WeightDelete';
import { IWeightEntity } from '@/services/weight';
import { Text } from '@/components/text';

interface IProps {
  weightList: IWeightEntity[];
}

export default function WeightList(props: IProps) {
  const { weightList } = props;

  if (!weightList || weightList.length === 0) {
    return (
      <div className="flex flex-col gap-2">
        <Text.SUBTITLE text="몸무게 리스트" />
        <Text.HEADING text="몸무게 기록이 없습니다." />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Text.SUBTITLE text="몸무게 리스트" />

      <table>
        <thead>
          <tr>
            <th>몸무게</th>
            <th>시간</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {weightList.map((weight) => (
            <tr key={weight.id}>
              <td>
                <div className="flex justify-center items-center gap-2">
                  {weight.weight && `${weight.weight}kg`}
                  {/* {weight.image && (
                    <img
                      className="w-24 h-24 object-cover rounded-lg"
                      src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${weight.file_name}`}
                      alt="weight image"
                    />
                  )} */}
                </div>
              </td>
              <td>
                {new Date(weight.created_at).toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </td>
              <td>
                <WeightDelete weight={weight} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
