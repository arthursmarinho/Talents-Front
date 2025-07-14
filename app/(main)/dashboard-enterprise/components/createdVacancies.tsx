"use client";

import {
  deleteJobVacancy,
  listJobVacancies,
} from "@/services/jobVacancyService";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Trash2, X } from "lucide-react";

interface Vacancies {
  id: number;
  jobPlace: string;
  jobName: string;
  jobDesc: string;
  jobReq: string;
  createdBy: string;
}

export default function CreatedVacancies() {
  const [vacancies, setVacancies] = useState<Vacancies[]>([]);
  const [selectedVacancyId, setSelectedVacancyId] = useState<number | null>(
    null
  );
  const { user } = useUser();

  useEffect(() => {
    if (user?.uid) {
      listJobVacancies(user.uid)
        .then(setVacancies)
        .catch((err) => console.error("Erro ao buscar vagas:", err));
    }
  }, [user?.uid]);

  const selectedVacancy = vacancies.find((v) => v.id === selectedVacancyId);

  const deleteVacancy = async (id: number) => {
    try {
      await deleteJobVacancy(id);
      setVacancies((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      console.error("Erro ao deletar vaga:", err);
    }
  };

  return (
    <div className="space-y-6">
      {vacancies.map((item) => (
        <Card
          key={item.id}
          className="cursor-pointer hover:shadow-lg transition relative"
        >
          <Sheet>
            <SheetTrigger>
              <Trash2 className="w-5 h-5 text-red-500 hover:text-red-700 absolute top-2 right-2 cursor-pointer" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Deseja apagar?</SheetTitle>
                <SheetDescription>
                  Essa ação não podera ser desfeita!
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
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
