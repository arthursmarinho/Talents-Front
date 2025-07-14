"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";
import { createJobVacancy } from "@/services/jobVacancyService";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";

export default function CreateJobVacancy() {
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);
  const [jobName, setJobName] = useState("");
  const [jobPlace, setJobPlace] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobRequirements, setJobRequirements] = useState("");

  const { user } = useUser();

  function toggleOpenCreateJobButton() {
    setIsCreateJobOpen(!isCreateJobOpen);
  }

  async function handleSave() {
    if (!jobName || !jobDescription || !jobRequirements || !jobPlace) {
      !toast.error("Preencha todos os campos.");
      return;
    }

    try {
      await createJobVacancy({
        id: 0,
        jobName,
        jobDesc: jobDescription,
        jobReq: jobRequirements,
        jobPlace: jobPlace,
        createdBy: user?.uid || "",
      });

      toast.success("Vaga criada com sucesso!");
      setIsCreateJobOpen(false);
      setJobName("");
      setJobDescription("");
      setJobRequirements("");
      setJobPlace("");
      window.location.reload();
    } catch (error) {
      toast.error("Erro ao criar vaga.");
      console.error(error);
    }
  }

  return (
    <div>
      <Button
        className="bg-green-500 text-white"
        onClick={toggleOpenCreateJobButton}
      >
        Criar nova vaga <Plus className="ml-2" />
      </Button>

      {isCreateJobOpen && (
        <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
            <h2 className="text-2xl font-semibold text-center">Nova Vaga</h2>

            <div className="flex flex-row items-center gap-2">
              <Input
                placeholder="Digite o nome da vaga"
                value={jobName}
                onChange={(e) => setJobName(e.target.value)}
                maxLength={40}
              />
              <p className="text-gray-400">{jobName.length}/40</p>
            </div>
            <div className="flex flex-row gap-2">
              <Input
                placeholder="Digite a descrição da vaga"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                maxLength={1000}
              />
              <p className="text-gray-400">{jobDescription.length}/1000</p>
            </div>
            <div className="flex flex-row gap-2">
              <Input
                placeholder="Digite os requisitos da vaga"
                value={jobRequirements}
                onChange={(e) => setJobRequirements(e.target.value)}
                maxLength={300}
              />
              <p className="text-gray-400">{jobRequirements.length}/300</p>
            </div>
            <div className="flex flex-row gap-2">
              <Input
                placeholder="Digite o local da vaga"
                value={jobPlace}
                onChange={(e) => setJobPlace(e.target.value)}
                maxLength={30}
              />
              <p className="text-gray-400">{jobPlace.length}/30</p>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={toggleOpenCreateJobButton}>
                Cancelar
              </Button>
              <Button className="bg-green-500 text-white" onClick={handleSave}>
                Salvar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
