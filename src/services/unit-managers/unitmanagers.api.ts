import axiosInstance from "@/lib/axios"

// Date string ISO
export interface Top10UnitManagerItem {
    AgentName: string;
    CurrentMonth: number;
}

export interface Top10UnitManagersResponse {
    success: boolean;
    data: Top10UnitManagerItem[];
    message?: string;
}

export const getTop10UnitManagers = async (date: string): Promise<Top10UnitManagersResponse> => {
    const response = await axiosInstance.get<Top10UnitManagersResponse>("/users/top-10-um", {
        params: {
            date,
        }
    })
    return response.data;
}
