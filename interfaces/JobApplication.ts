export enum ApplicationStatus {
  PENDING = "Pendente",
  APPROVED = "Aprovado",
  REJECTED = "Rejeitado",
}

export interface JobApplication {
  id: number;
  jobId: number;
  candidateId: string;
  resumeData: number[] | null;
  createdAt: string;
  status: ApplicationStatus;
}
