// 'use client';

// import { Text } from '@/components/text';
// import { IPatientEntity } from '@/services/patient';
// import { formatBirthDate } from '@/utils/birth-format';

// interface IProps {
//   patient: IPatientEntity;
// }

// export default function PatientInfo(props: IProps) {
//   const { patient } = props;

//   if (!patient) {
//     return <Text.HEADING text="환자 정보를 불러올 수 없습니다." />;
//   }

//   return (
//     <div className="flex flex-col gap-2">
//       <Text.SUBTITLE text="정보" />

//       <Text.HEADING text={`이름: ${patient.name}`} />
//       <Text.HEADING text={`생년월일: ${formatBirthDate(patient.birth)}`} />
//       <Text.HEADING text={`등록번호: ${patient.register}`} />
//     </div>
//   );
// }
