export enum ApplicationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface JobApplication {
  id: number;
  jobId: number;
  candidateId: string;
  resumeData: number[] | null;
  createdAt: string;
  status: ApplicationStatus;
}
