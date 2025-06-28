import WeightRegister from "./WeightRegister";
import HomeButton from "@/components/button/HomeButton";
import PatientInfo from "@/app/patient/[id]/PatientInfo";
import WeightList from "@/app/patient/[id]/WeightList";

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl">환자 정보</h1>
        <PatientInfo id={id} />
      </div>

      <WeightRegister id={id} />

      <div className="flex flex-col gap-4">
        <h1 className="text-4xl">몸무게 기록</h1>
        <WeightList id={id} />
      </div>

      <HomeButton />
    </div>
  );
}
