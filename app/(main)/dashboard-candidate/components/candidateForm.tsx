"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { getApplicationStatusForCandidate } from "@/services/jobVacancyService";
import { ApplicationStatus } from "@/interfaces/JobApplication";

export default function CandidateForm({ jobId }: { jobId: number }) {
  const [file, setFile] = useState<File | null>(null);
  const [candidateId, setCandidateId] = useState("");
  const [applicationStatus, setApplicationStatus] =
    useState<ApplicationStatus | null>(null);
  const [isLoadingStatus, setIsLoadingStatus] = useState(true);

  const { user } = useUser();

  useEffect(() => {
    const fetchApplicationStatus = async () => {
      if (user?.uid && jobId) {
        setIsLoadingStatus(true);
        try {
          const statusData = await getApplicationStatusForCandidate(
            jobId,
            user.uid
          );
          if (statusData) {
            setApplicationStatus(statusData.status);
          } else {
            setApplicationStatus(null);
          }
        } catch (error) {
          console.error("Erro ao buscar status da candidatura:", error);
          setApplicationStatus(null);
        } finally {
          setIsLoadingStatus(false);
        }
      } else {
        setIsLoadingStatus(false);
      }
    };

    fetchApplicationStatus();
  }, [user?.uid, jobId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      toast.error("Selecione um arquivo de currículo.");
      return;
    }
    if (!user?.uid) {
      toast.error("Você precisa estar logado para se candidatar.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobId", jobId.toString());
    formData.append("candidateId", user.uid);

    const res = await fetch("http://localhost:3000/job-applications/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      toast.success("Currículo enviado com sucesso!");
      setFile(null);
      setApplicationStatus(ApplicationStatus.PENDING);
    } else {
      const errorData = await res.json();
      toast.error(errorData.message || "Erro ao enviar currículo.");
      console.error("Erro ao enviar currículo:", errorData);
    }
  }

  const getStatusText = (status: ApplicationStatus | null) => {
    switch (status) {
      case ApplicationStatus.PENDING:
        return "Sua candidatura está PENDENTE de avaliação.";
      case ApplicationStatus.APPROVED:
        return "Parabéns! Sua candidatura foi APROVADA!";
      case ApplicationStatus.REJECTED:
        return "Sua candidatura foi REPROVADA.";
      default:
        return "Carregando status...";
    }
  };

  if (isLoadingStatus) {
    return <p>Carregando status da sua candidatura...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {applicationStatus !== null ? (
        <div
          className={`p-3 rounded-md text-center font-semibold ${
            applicationStatus === ApplicationStatus.APPROVED
              ? "bg-green-100 text-green-700"
              : applicationStatus === ApplicationStatus.REJECTED
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {getStatusText(applicationStatus)}
          {applicationStatus === ApplicationStatus.REJECTED && (
            <p className="text-sm mt-1">
              Você pode tentar se candidatar novamente com um novo currículo, se
              desejar.
            </p>
          )}
        </div>
      ) : (
        <>
          <p className="text-gray-600">Envie seu currículo para esta vaga.</p>
          <Input
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              if (e.target.files) setFile(e.target.files[0]);
            }}
            required
          />
          <Button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={!file}
          >
            Enviar currículo
          </Button>
        </>
      )}
    </form>
  );
}
