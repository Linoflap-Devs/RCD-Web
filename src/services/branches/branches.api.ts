import axiosInstance from "@/lib/axios";

export interface AgentsResponse {
  success: boolean;
  data: BranchesItem[];
  message?: string;
}

export interface BranchesItem {
    BranchName: string;
    BranchID: number;
    branchCode: string;
    branchID: number;
    branchName: string;
}

export const getBranches = async (): Promise<AgentsResponse> => {
  const response = await axiosInstance.get<AgentsResponse>("/branches");
  return response.data; 
};