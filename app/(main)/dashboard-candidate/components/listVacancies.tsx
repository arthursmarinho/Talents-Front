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

export default function ListVacancies() {
  const [vacancies, setVacancies] = useState<Vacancies[]>([]);
  const [selectedVacancyId, setSelectedVacancyId] = useState<number | null>(
    null
  );
  const [searchBar, setSearchBar] = useState("");

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

      {filteredVacancies.map((item) => (
        <Card
          key={item.id}
          className="cursor-pointer hover:shadow-lg transition relative"
        >
          <CardHeader onClick={() => setSelectedVacancyId(item.id)}>
            <CardTitle className="text-xl">{item.jobName}</CardTitle>
            <CardDescription>{item.jobPlace}</CardDescription>
          </CardHeader>
          <CardFooter className="text-sm text-gray-600">
            {item.jobReq}
          </CardFooter>
        </Card>
      ))}

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
