"use client";

import { Input } from "@/components/ui/input";
import { Vacancies } from "@/interfaces/Vacancies";
import { listJobVacancies } from "@/services/jobVacancyService";
import { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import CandidateForm from "./candidateForm";
import { Skeleton } from "@/components/ui/skeleton";

export default function ListVacancies() {
  const [vacancies, setVacancies] = useState<Vacancies[]>([]);
  const [selectedVacancyId, setSelectedVacancyId] = useState<number | null>(
    null
  );
  const [searchBar, setSearchBar] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const filteredVacancies = vacancies.filter((v) =>
    v.jobName.toLowerCase().includes(searchBar.toLowerCase())
  );

  useEffect(() => {
    listJobVacancies()
      .then((data) => {
        const mapped = data
          .filter((v) => typeof v.id === "number")
          .map((v) => ({
            id: v.id as number,
            jobName: v.jobName,
            jobPlace: v.jobPlace,
            jobReq: v.jobReq,
            jobDesc: v.jobDesc,
            createdBy: v.createdBy,
          }));
        setVacancies(mapped);
      })
      .catch((err) => console.error("Erro ao buscar vagas:", err));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const selectedVacancy = vacancies.find((v) => v.id === selectedVacancyId);

  return (
    <div className="space-y-6">
      <div className="w-full max-w-md">
        <Input
          type="text"
          placeholder="Buscar vaga por nome"
          value={searchBar}
          onChange={(e) => setSearchBar(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4"
        />
      </div>
      {isLoading ? (
        <div className="flex flex-col gap-4 mt-12">
          <Skeleton className="w-40 h-4 rounded mb-2" />
          <Skeleton className="w-56 h-4 rounded" />
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-12">
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
          ))}{" "}
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
              <CandidateForm jobId={selectedVacancy.id} />
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
