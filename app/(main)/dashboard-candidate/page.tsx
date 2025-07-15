import Header from "../components/header";
import ListVacancies from "./components/listVacancies";

export default function DashboardEnterprise() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="grid grid-cols-2">
        <div className="p-24">
          <h1 className="font-bold text-2xl mb-8">Vagas para você</h1>
          <p className="mb-4">Clique para mais detalhes</p>
          <ListVacancies />
        </div>
      </div>
    </div>
  );
}
