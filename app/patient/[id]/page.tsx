// import WeightRegister from './WeightRegister';
// import PatientInfo from '@/app/patient/[id]/PatientInfo';
// import WeightList from '@/app/patient/[id]/WeightList';
// import { Text } from '@/components/text';
// import { getPatient } from '@/services/patient';
// import { LinkButton } from '@/components/button';
// import { getWeightList } from '@/services/weight/action';

// interface IProps {
//   params: Promise<{ id: string }>;
// }

export default async function DetailPage() {
  //   const { params } = props;
  //   const { id } = await params;
  //   const patient = await getPatient(id);
  //   const weightList = await getWeightList(id);
  //   if (!patient) {
  //     return (
  //       <div className="flex flex-col gap-8">
  //         <Text.TITLE text="관리자 - 환자 상세" />
  //         <Text.HEADING text="환자를 찾을 수 없습니다." />
  //         <LinkButton.GRAY text="환자 목록" href="/patient" />
  //       </div>
  //     );
  //   }
  //   return (
  //     <div className="flex flex-col gap-8">
  //       <Text.TITLE text="환자 상세" />
  //       <PatientInfo patient={patient} />
  //       <WeightRegister patientId={id} />
  //       <WeightList weightList={weightList} />
  //       <LinkButton.GRAY text="환자 목록" href="/patient" />
  //     </div>
  //   );
}
