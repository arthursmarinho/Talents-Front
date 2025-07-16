import api from "./api";
import { JobApplication, ApplicationStatus } from "@/interfaces/JobApplication";

export interface CreateJobVacancyDto {
  id?: number;
  jobName: string;
  jobDesc: string;
  jobPlace: string;
  jobReq: string;
  createdBy: string;
}

export interface JobVacancyWithApplications extends CreateJobVacancyDto {
  id: number;
  applications: JobApplication[];
}

export const createJobVacancy = async (data: CreateJobVacancyDto) => {
  const response = await api.post("/job-vacancies", data);
  return response.data;
};

export const listJobVacanciesById = async (uid: string) => {
  const response = await api.get("/job-vacancies/vacancy", {
    params: { createdBy: uid },
  });
  return response.data;
};

export const listJobVacancies = async () => {
  const response = await api.get("/job-vacancies");
  return response.data;
};

export const deleteJobVacancy = async (id: number) => {
  const response = await api.delete(`/job-vacancies/${id}`);
  return response.data;
};

export const getApplicationsByJobId = async (
  jobId: number
): Promise<JobApplication[]> => {
  const response = await api.get(`/job-applications/job/${jobId}`);
  return response.data;
};

export const updateJobApplicationStatus = async (
  id: number,
  status: ApplicationStatus
) => {
  const response = await api.patch(`/job-applications/${id}/status`, {
    status,
  });
  return response.data;
};

export const getApplicationStatusForCandidate = async (
  jobId: number,
  candidateId: string
): Promise<{ id: number; status: ApplicationStatus } | null> => {
  try {
    const response = await api.get(
      `/job-applications/status/${jobId}/${candidateId}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) return null;
    throw error;
  }
};
