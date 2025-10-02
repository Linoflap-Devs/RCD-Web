import axiosInstance from "@/lib/axios"

// Date string ISO
export interface Top10SalesPersonItem {
    AgentName: string;
    CurrentMonth: number;
}

export interface Top10SalesPersonsResponse {
    success: boolean;
    data: Top10SalesPersonItem[];
    message?: string;
}

export const getTop10SalesPersons = async (date: string): Promise<Top10SalesPersonsResponse> => {
    const response = await axiosInstance.get<Top10SalesPersonsResponse>("/users/top-10-sp", {
        params: {
            date,
        }
    })
    return response.data;
}
