import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface CreateJobVacancyDto {
  id: number;
  jobName: string;
  jobDesc: string;
  jobPlace: string;
  jobReq: string;
  createdBy: string;
}

export const createJobVacancy = async (data: CreateJobVacancyDto) => {
  const response = await axios.post(`${API_URL}/job-vacancies`, data);
  return response.data;
};

export const listJobVacanciesById = async (uid: string) => {
  const response = await axios.get(`${API_URL}/job-vacancies/vacancy`, {
    params: { createdBy: uid },
  });
  return response.data;
};

export const listJobVacancies = async () => {
  const response = await axios.get(`${API_URL}/job-vacancies/vacancy`);
  return response.data;
};

export const deleteJobVacancy = async (id: number) => {
  const response = await axios.delete(`${API_URL}/job-vacancies/${id}`);
  return response.data;
};
