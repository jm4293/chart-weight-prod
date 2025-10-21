// 'use client';

// import WeightDelete from '@/app/patient/[id]/WeightDelete';
// import { IWeightEntity } from '@/services/weight';
// import { Text } from '@/components/text';
// import Image from 'next/image';

// interface IProps {
//   weightList: IWeightEntity[];
// }

// export default function WeightList(props: IProps) {
//   const { weightList } = props;

//   if (!weightList || weightList.length === 0) {
//     return (
//       <div className="flex flex-col gap-2">
//         <Text.SUBTITLE text="몸무게 리스트" />
//         <Text.HEADING text="몸무게 기록이 없습니다." />
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-2">
//       <Text.SUBTITLE text="몸무게 리스트" />

//       <table>
//         <thead>
//           <tr>
//             <th>몸무게</th>
//             <th>사진</th>
//             <th>시간</th>
//             <th>삭제</th>
//           </tr>
//         </thead>
//         <tbody>
//           {weightList.map((weight) => (
//             <tr key={weight.id}>
//               <td>{weight?.weight ? `${weight.weight}kg` : '-'}</td>
//               <td className="flex items-center justify-center">
//                 {weight.image ? (
//                   <Image
//                     src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${weight.image}`}
//                     alt="몸무게 이미지"
//                     width={50}
//                     height={50}
//                     className="rounded-md"
//                     loading="lazy"
//                     onClick={() =>
//                       window.open(
//                         `${process.env.NEXT_PUBLIC_IMAGE_URL}/${weight.image}`,
//                         '_blank',
//                       )
//                     }
//                   />
//                 ) : (
//                   '-'
//                 )}
//               </td>
//               <td>
//                 {new Date(weight.created_at).toLocaleTimeString('ko-KR', {
//                   hour: '2-digit',
//                   minute: '2-digit',
//                 })}
//               </td>
//               <td>
//                 <WeightDelete weight={weight} />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
