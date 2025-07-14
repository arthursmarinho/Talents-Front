import Header from "../components/header";
import CreateJobVacancy from "./components/createJobVacancy";
import CreatedVacancies from "./components/createdVacancies";

export default function DashboardEnterprise() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="grid grid-cols-2">
        <div className="p-24">
          <h1 className="font-bold text-2xl mb-8">
            Vagas criadas pela sua empresa
          </h1>
          <p className="mb-4">Clique para mais detalhes</p>
          <CreatedVacancies />
        </div>
        <div className="flex justify-end p-6 px-14">
          <CreateJobVacancy />
        </div>
      </div>
    </div>
  );
}
