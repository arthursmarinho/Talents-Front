import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface CreateJobApplicationDto {
  jobId: number;
  candidateId: string;
  resumeUrl: string;
}

export const applyToJob = async (data: CreateJobApplicationDto) => {
  const response = await axios.post(`${API_URL}/job-applications`, data);
  return response.data;
};

export const listJobApplications = async () => {
  const response = await axios.get(`${API_URL}/job-applications`);
  return response.data;
};
