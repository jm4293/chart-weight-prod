import PatientList from "@/app/patient/PatientList";
import LogoutButton from "@/components/button/LogoutButton";

export default function PatientPage() {
  return (
    <div className="flex flex-col gap-12">
      <PatientList />

      {/* <LogoutButton /> */}
    </div>
  );
}
