import { formatBirthDate } from '@/utils/birth-format';
import { IPatientEntity } from '@/services/patient';
import { Text } from '@/components/text';
import Link from 'next/link';

interface IProps {
  patientList: IPatientEntity[];
}

export default function AdminPatientList(props: IProps) {
  const { patientList } = props;

  if (!patientList || patientList.length === 0) {
    return <Text.HEADING text="환자 명단이 없습니다." />;
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>생년월일</th>
            <th>등록번호</th>
          </tr>
        </thead>
        <tbody>
          {patientList.map((user) => (
            <Link href={`/admin/patient/${user.id}`} key={user.id}>
              <tr className="hover:bg-gray-100">
                <td>{user.name}</td>
                <td>{formatBirthDate(user.birth)}</td>
                <td>{user.register}</td>
              </tr>
            </Link>
          ))}
        </tbody>
      </table>
    </div>
  );
}
