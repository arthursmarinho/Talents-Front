import axios from "axios";

export interface CreateJobApplicationDto {
  jobId: number;
  candidateId: string;
  resumeUrl: string;
}

export const createJobApplication = async (data: CreateJobApplicationDto) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/job-applications`,
    data
  );
  return response.data;
};
