import ProtectedEnterprisePage from "@/middleware/ProtectedEnterprisePage";
import Header from "../components/header";
import CreateJobVacancy from "./components/createJobVacancy";
import CreatedVacancies from "./components/createdVacancies";

export default function DashboardEnterprise() {
  return (
    <div>
      <ProtectedEnterprisePage>
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6 md:p-24">
            <h1 className="font-bold text-2xl mb-8">
              <CreateJobVacancy />
              Vagas criadas pela sua empresa
            </h1>
            <p className="mb-4">Clique para mais detalhes</p>
            <CreatedVacancies />
          </div>
          <div className="flex justify-end p-6 md:px-14"></div>
        </div>
      </ProtectedEnterprisePage>
    </div>
  );
}
