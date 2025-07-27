import AdminHomeButton from "@/components/button/AdminHomeButton";
import AdminPatientRegister from "@/app/admin/register/AdminPatientRegistger";

export default function RegisterPatientPage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl">환자 등록</h1>
        <AdminPatientRegister />
      </div>

      <AdminHomeButton />
    </div>
  );
}
