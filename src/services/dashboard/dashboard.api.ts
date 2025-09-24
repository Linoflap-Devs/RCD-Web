import axiosInstance from "@/lib/axios"

export interface KPIItem {
    totalDivisions: number;
    totalAgents: number;
    totalProjects: number;
    totalSalesPreviousYear: number;
    totalSalesCurrentMonth: number;
}

export interface DivisionSalesItem {
    Division: string;
    CurrentMonth: number;
    LastMonth: number;
    CurrentMonthLastYear: number;
    CurrentQuarter: number;
    LastQuarter: number;
    LastYear: number;
    CurrentYear: number;
}

export interface Top10DivisionsItem {
    Division: string;
    CurrentMonth: number; // sales
}

export interface Top10SalesPersonsItem {
    AgentName: string;
    CurrentMonth: number; // sales
}

export interface Top10UnitManagersItem {
    AgentName: string;
    CurrentMonth: number; // sales
}

export interface Top10ForecastBuyersItem {
    BuyersName: string;
    NetTotalTCP: number;
}

export interface CommissionForecastByYearMonthItem {
  Year: number;
  Months: {
    Month: number;
    NetTotalTCP: number;
  }[];
}

export interface CommissionForecastItem {
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

export interface DashboardItem {
    KPI: KPIItem;
    DivisionSales: DivisionSalesItem[];
    Top10Divisions: Top10DivisionsItem[];
    Top10SalesPersons: Top10SalesPersonsItem[];
    Top10UnitManagers: Top10UnitManagersItem[];
    Top10ForecastBuyers: Top10ForecastBuyersItem[];
    CommissionForecastByYearMonth: CommissionForecastByYearMonthItem[];
    CommissionForecast: CommissionForecastItem[];
}

export interface DashboardResponse {
    success: boolean;
    data: DashboardItem;
    message?: string;
}

export const getDashboardWeb = async (): Promise<DashboardResponse> => {
    const response = await axiosInstance.get<DashboardResponse>("/dashboard/web")
    console.log(response);
    return response.data;
}