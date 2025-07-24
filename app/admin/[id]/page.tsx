import AdminPatientInfo from "@/app/admin/[id]/AdminPatientInfo";
import AdminHomeButton from "@/components/button/AdminHomeButton";

export default async function AdminDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl">환자 정보</h1>
        <AdminPatientInfo id={id} />
      </div>

      <AdminHomeButton />
    </div>
  );
}
