"use client";

import {
  deleteJobVacancy,
  listJobVacanciesById,
  getApplicationsByJobId,
  updateJobApplicationStatus,
  JobVacancyWithApplications,
} from "@/services/jobVacancyService";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcnui/sheet";
import { Button } from "@/components/shadcnui/button";
import { Trash2, X, FileText, CheckCircle, XCircle } from "lucide-react";
import { Input } from "@/components/shadcnui/input";
import { JobApplication, ApplicationStatus } from "@/interfaces/JobApplication";
import { toast } from "sonner";
import { Skeleton } from "@/components/shadcnui/skeleton";

export default function CreatedVacancies() {
  const [vacancies, setVacancies] = useState<JobVacancyWithApplications[]>([]);
  const [selectedVacancyId, setSelectedVacancyId] = useState<number | null>(
    null
  );
  const [searchBar, setSearchBar] = useState("");
  const [selectedApplications, setSelectedApplications] = useState<
    JobApplication[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  const fetchVacancies = async () => {
    if (user?.uid) {
      try {
        const data = await listJobVacanciesById(user.uid);
        setVacancies(data);
      } catch (err) {
        console.error("Erro ao buscar vagas:", err);
      }
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, [user?.uid]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedVacancyId) {
      getApplicationsByJobId(selectedVacancyId)
        .then(setSelectedApplications)
        .catch((err) => console.error("Erro ao buscar candidaturas:", err));
    } else {
      setSelectedApplications([]);
    }
  }, [selectedVacancyId]);

  const selectedVacancy = vacancies.find((v) => v.id === selectedVacancyId);

  const deleteVacancy = async (id: number) => {
    try {
      await deleteJobVacancy(id);
      setVacancies((prev) => prev.filter((v) => v.id !== id));
      setSelectedVacancyId(null);
      toast.success("Vaga deletada com sucesso!");
    } catch (err) {
      console.error("Erro ao deletar vaga:", err);
      toast.error("Erro ao deletar vaga.");
    }
  };

  const handleUpdateApplicationStatus = async (
    applicationId: number,
    status: ApplicationStatus
  ) => {
    try {
      await updateJobApplicationStatus(applicationId, status);
      setSelectedApplications((prev) =>
        prev.map((app) => (app.id === applicationId ? { ...app, status } : app))
      );
      toast.success(`Candidatura ${status.toLowerCase()} com sucesso!`);
    } catch (err) {
      console.error("Erro ao atualizar status da candidatura:", err);
      toast.error("Erro ao atualizar status da candidatura.");
    }
  };

  const filteredVacancies = vacancies.filter((v) =>
    v.jobName.toLowerCase().includes(searchBar.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="w-full max-w-md mx-auto">
        <Input
          type="text"
          placeholder="Buscar vaga por nome"
          value={searchBar}
          onChange={(e) => setSearchBar(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4"
        />
      </div>
      {isLoading ? (
        <div className="gap-4 mt-12">
          <Skeleton className="w-40 h-4 rounded mb-2" />
          <Skeleton className="w-56 h-4 rounded" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          {filteredVacancies.map((item) => (
            <Card
              key={item.id}
              className="cursor-pointer hover:shadow-lg transition relative"
            >
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 p-1 rounded-full text-red-500 hover:text-red-700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Deseja apagar?</SheetTitle>
                    <SheetDescription>
                      Essa ação não poderá ser desfeita!
                    </SheetDescription>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteVacancy(item.id);
                      }}
                      variant="destructive"
                    >
                      Apagar
                    </Button>
                  </SheetHeader>
                </SheetContent>
              </Sheet>

              <CardHeader onClick={() => setSelectedVacancyId(item.id)}>
                <CardTitle className="text-xl">{item.jobName}</CardTitle>
                <CardDescription>{item.jobPlace}</CardDescription>
              </CardHeader>
              <CardFooter
                className="text-sm text-gray-600"
                onClick={() => setSelectedVacancyId(item.id)}
              >
                {item.jobReq}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {selectedVacancy && (
        <div className="fixed inset-0 z-40 bg-black/30">
          <div className="fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 overflow-y-auto p-6">
            <Button
              onClick={() => setSelectedVacancyId(null)}
              className="absolute top-3 right-3 p-2 rounded-full"
              variant="ghost"
              size="icon"
            >
              <X className="w-5 h-5" />
            </Button>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  {selectedVacancy.jobName}
                </CardTitle>
                <CardDescription>{selectedVacancy.jobDesc}</CardDescription>
              </CardHeader>
              <CardFooter className="text-gray-700 font-medium">
                {selectedVacancy.jobReq}
              </CardFooter>

              <h3 className="text-xl font-semibold mt-6 mb-4">
                Candidaturas Recebidas
              </h3>
              {selectedApplications.length === 0 ? (
                <p>Nenhuma candidatura para esta vaga ainda.</p>
              ) : (
                <div className="space-y-4">
                  {selectedApplications.map((app) => (
                    <Card
                      key={app.id}
                      className="p-4 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold">
                          Candidato ID: {app.candidateId}
                        </p>
                        <p className="text-sm text-gray-600">
                          Status: {app.status}
                        </p>
                        <p className="text-xs text-gray-500">
                          Data: {new Date(app.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            if (!app.resumeData) {
                              toast.error("Currículo não disponível.");
                              return;
                            }

                            try {
                              const uint8Array = new Uint8Array(app.resumeData);
                              const blob = new Blob([uint8Array], {
                                type: "application/pdf",
                              });
                              const url = URL.createObjectURL(blob);
                              window.open(url, "_blank");
                              setTimeout(() => URL.revokeObjectURL(url), 1000);
                            } catch (error) {
                              console.error("Erro ao abrir PDF:", error);
                              toast.error(
                                "Não foi possível abrir o currículo. Verifique o console para mais detalhes."
                              );
                            }
                          }}
                          title="Visualizar Currículo"
                        >
                          <FileText className="w-5 h-5" />
                        </Button>
                        {app.status === ApplicationStatus.PENDING && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-green-600 hover:text-green-800"
                              onClick={() =>
                                handleUpdateApplicationStatus(
                                  app.id,
                                  ApplicationStatus.APPROVED
                                )
                              }
                              title="Aprovar"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600 hover:text-red-800"
                              onClick={() =>
                                handleUpdateApplicationStatus(
                                  app.id,
                                  ApplicationStatus.REJECTED
                                )
                              }
                              title="Reprovar"
                            >
                              <XCircle className="w-5 h-5" />
                            </Button>
                          </>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
