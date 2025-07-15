"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export default function CandidateForm({ jobId }: { jobId: number }) {
  const [file, setFile] = useState<File | null>(null);
  const [candidateId, setCandidateId] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return alert("Selecione um arquivo");

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobId", jobId.toString());
    formData.append("candidateId", candidateId.toString());

    const res = await fetch("http://localhost:3000/job-applications/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      toast("Currículo enviado com sucesso!");
      setFile(null);
      setCandidateId("");
    } else {
      toast("Erro ao enviar currículo");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <Input
        type="text"
        placeholder="Seu ID (email ou outro)"
        value={candidateId}
        onChange={(e) => setCandidateId(e.target.value)}
        required
        className="border p-2 w-full"
      />
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
      >
        Enviar currículo
      </Button>
    </form>
  );
}
