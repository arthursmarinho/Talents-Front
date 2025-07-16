import api from "./api";

export interface CreateJobApplicationDto {
  jobId: number;
  candidateId: string;
  resumeUrl: string;
}

export const createJobApplication = async (data: CreateJobApplicationDto) => {
  const response = await api.post("/job-applications", data);
  return response.data;
};

export const uploadResume = async (
  jobId: number,
  candidateId: string,
  file: File
) => {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("jobId", jobId.toString());
  formData.append("candidateId", candidateId);

  const response = await api.post("/job-applications/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
