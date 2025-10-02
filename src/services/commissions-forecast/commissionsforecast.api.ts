import axiosInstance from "@/lib/axios"

// Date string ISO
export interface ComissionForecastsItem {
    ReservationDate: string | Date
    BuyersName: string
    SalesTranID: number
    DeveloperID: number
    NetTotalTCP: number
    DownPayment: number
    MonthlyDP: number
    DPStartSchedule: string | Date
    DPTerms: string
    EndDP: string | Date
    MonthPaid: number
    DPPaid: number
    ForeCastPercentDPPaid: number
    PercentRelease: number
    DPPercentPaid: number
    DeveloperName: string
    Division: string
    ProjectName: string
    rowno: string
}

export interface CollectionForecastResponse {
    success: boolean;
    data: ComissionForecastsItem[];
    message?: string;
}

export const getCollectionForecasr = async (date: string): Promise<CollectionForecastResponse> => {
    const response = await axiosInstance.get<CollectionForecastResponse>("/commissions/forecast", {
        params: {
            date,
        }
    })
    return response.data;
}
