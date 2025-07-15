import axios from "axios";
import { JobApplication, ApplicationStatus } from "@/interfaces/JobApplication";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
  const response = await axios.post(`${API_URL}/job-vacancies`, data);
  return response.data;
};

export const listJobVacanciesById = async (
  uid: string
): Promise<JobVacancyWithApplications[]> => {
  const response = await axios.get(`${API_URL}/job-vacancies/vacancy`, {
    params: { createdBy: uid },
  });
  return response.data;
};

export const listJobVacancies = async (): Promise<CreateJobVacancyDto[]> => {
  const response = await axios.get(`${API_URL}/job-vacancies`);
  return response.data;
};

export const deleteJobVacancy = async (id: number) => {
  const response = await axios.delete(`${API_URL}/job-vacancies/${id}`);
  return response.data;
};

export const getApplicationsByJobId = async (
  jobId: number
): Promise<JobApplication[]> => {
  const response = await axios.get(`${API_URL}/job-applications/job/${jobId}`);
  return response.data;
};

export const updateJobApplicationStatus = async (
  id: number,
  status: ApplicationStatus
) => {
  const response = await axios.patch(
    `${API_URL}/job-applications/${id}/status`,
    { status }
  );
  return response.data;
};

export const getApplicationStatusForCandidate = async (
  jobId: number,
  candidateId: string
): Promise<{ id: number; status: ApplicationStatus } | null> => {
  try {
    const response = await axios.get(
      `${API_URL}/job-applications/status/${jobId}/${candidateId}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};
