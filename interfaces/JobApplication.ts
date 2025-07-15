export enum ApplicationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface JobApplication {
  id: number;
  jobId: number;
  candidateId: string;
  resumeData: string;
  createdAt: string;
  status: ApplicationStatus;
}
