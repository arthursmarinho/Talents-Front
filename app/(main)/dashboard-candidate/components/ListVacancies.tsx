"use client";

import { Input } from "@/components/shadcnui/input";
import { Vacancies } from "@/interfaces/Vacancies";
import {
  listJobVacancies,
  getApplicationStatusForCandidate,
} from "@/services/jobVacancyService";
import { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import { Button } from "@/components/shadcnui/button";
import { X } from "lucide-react";
import CandidateForm from "./CandidateForm";
import { Skeleton } from "@/components/shadcnui/skeleton";
import { ApplicationStatus } from "@/interfaces/JobApplication";
import { useUser } from "@/context/UserContext";

export default function ListVacancies() {
  const [vacancies, setVacancies] = useState<Vacancies[]>([]);
  const [selectedVacancyId, setSelectedVacancyId] = useState<number | null>(
    null
  );
  const [searchBar, setSearchBar] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [statusMap, setStatusMap] = useState<Record<number, ApplicationStatus>>(
    {}
  );
  const [filter, setFilter] = useState<"ALL" | "APPROVED" | "REJECTED">("ALL");

  const { user } = useUser();

  useEffect(() => {
    const fetchVacanciesAndStatus = async () => {
      try {
        const data = await listJobVacancies();
        const mapped = data
          .filter((v: any) => typeof v.id === "number")
          .map((v: any) => ({
            id: v.id as number,
            jobName: v.jobName,
            jobPlace: v.jobPlace,
            jobReq: v.jobReq,
            jobDesc: v.jobDesc,
            createdBy: v.createdBy,
          }));

        setVacancies(mapped);

        if (user?.uid) {
          const statusResults = await Promise.all(
            mapped.map(async (vacancy: any) => {
              const status = await getApplicationStatusForCandidate(
                vacancy.id,
                user.uid
              );
              return { jobId: vacancy.id, status: status?.status ?? null };
            })
          );

          const statusObj: Record<number, ApplicationStatus> = {};
          statusResults.forEach(({ jobId, status }) => {
            if (status) statusObj[jobId] = status;
          });

          setStatusMap(statusObj);
        }
      } catch (err) {
        console.error("Erro ao buscar vagas ou status:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVacanciesAndStatus();
  }, [user?.uid]);

  const filteredVacancies = vacancies.filter((v) => {
    const matchesSearch = v.jobName
      .toLowerCase()
      .includes(searchBar.toLowerCase());
    const status = statusMap[v.id];

    if (filter === "ALL") return matchesSearch;
    return (
      matchesSearch &&
      ((filter === "APPROVED" && status === ApplicationStatus.APPROVED) ||
        (filter === "REJECTED" && status === ApplicationStatus.REJECTED))
    );
  });

  const selectedVacancy = vacancies.find((v) => v.id === selectedVacancyId);

  return (
    <div className="space-y-6  ">
      <div className="w-full max-w-md mx-auto">
        <Input
          type="text"
          placeholder="Buscar vaga por nome"
          value={searchBar}
          onChange={(e) => setSearchBar(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4"
        />

        <div className="flex gap-2 justify-center mt-4">
          <Button
            variant={filter === "ALL" ? "default" : "outline"}
            onClick={() => setFilter("ALL")}
          >
            Todas
          </Button>
          <Button
            variant={filter === "APPROVED" ? "default" : "outline"}
            onClick={() => setFilter("APPROVED")}
          >
            Aprovadas
          </Button>
          <Button
            variant={filter === "REJECTED" ? "default" : "outline"}
            onClick={() => setFilter("REJECTED")}
          >
            Recusadas
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-4 mt-12">
          <Skeleton className="w-40 h-4 rounded mb-2" />
          <Skeleton className="w-56 h-4 rounded" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 w-full px-4">
          {filteredVacancies.map((item) => (
            <Card
              key={item.id}
              className="cursor-pointer hover:shadow-lg transition relative"
              onClick={() => setSelectedVacancyId(item.id)}
            >
              <CardHeader>
                <CardTitle className="text-xl">{item.jobName}</CardTitle>
                <CardDescription>{item.jobPlace}</CardDescription>
              </CardHeader>
              <CardFooter className="text-sm text-gray-600">
                {item.jobReq}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {selectedVacancy && (
        <div className="fixed inset-0 z-40 bg-black/30 flex justify-end">
          <div className="w-full md:max-w-lg h-full bg-white p-6 overflow-y-auto shadow-2xl">
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
              <CandidateForm jobId={selectedVacancy.id} />
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
