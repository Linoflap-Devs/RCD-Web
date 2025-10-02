import axiosInstance from "@/lib/axios"

// Date string ISO
export interface Top10DivisionsItem {
    Division: string;
    CurrentMonth: number;
    LastMonth?: number;
    CurrentMonthLastYear?: number;
    CurrentQuarter?: number;
    LastQuarter?: number;
    LastYear?: number;
    CurrentYear?: number;
}

export interface Top10DivisionsResponse {
    success: boolean;
    data: Top10DivisionsItem[];
    message?: string;
}

export const getTop10Divisions = async (date: string): Promise<Top10DivisionsResponse> => {
    const response = await axiosInstance.get<Top10DivisionsResponse>("/division/top-10", {
        params: {
            date,
        }
    })
    return response.data;
}


