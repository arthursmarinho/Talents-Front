import ProtectedCandidate from "@/middleware/ProtectedCandidatePage";
import Header from "../components/Header";
import ListVacancies from "./components/ListVacancies";

export default function DashboardCandidate() {
  return (
    <div>
      <ProtectedCandidate>
        <Header />
        <div className="grid grid-cols-1">
          <div className="p-6 md:p-24">
            <h1 className="font-bold text-2xl mb-8">Vagas para você</h1>
            <p className="mb-4">Clique para mais detalhes</p>
            <ListVacancies />
          </div>
        </div>
      </ProtectedCandidate>
    </div>
  );
}
