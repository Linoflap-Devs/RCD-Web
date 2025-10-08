import axiosInstance from "@/lib/axios"

export interface KPIItem {
    totalDivisions: number;
    totalAgents: number;
    totalProjects: number;
    totalSalesPreviousYear: number;
    totalSalesCurrentYear: number;
    totalSalesCurrentMonth: number;
    totalSalesLastMonth: number;
    totalDevelopers: number;
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

export interface Top10DashboardDivisionsItem {
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

export interface SalesTargetItem {
    Divisions: {
        CurrentMonth:  number;
        CurrentYear: number;
        DivisionName: string;
        PercentMonth: number;
        PercentYear: number;
        SalesYear: number;
        TargetMonth: number;
        TargetYear: number;
    }[];
    TotalCurrentMonth: number;
    TotalReachPercent: number;
    TotalTargetMonth: number;
}

export interface DownpaymentPercentItem {
    TotalForecast: number;
    TotalPaid: number;
    TotalPaidPercent: number;
}

export interface DeveloperSalesItem {
    DeveloperName: string;
    NetTotalTCP: number;
}

export interface DashboardItem {
    KPI: KPIItem;
    DivisionSales: DivisionSalesItem[];
    Top10Divisions: Top10DashboardDivisionsItem[];
    Top10SalesPersons: Top10SalesPersonsItem[];
    Top10UnitManagers: Top10UnitManagersItem[];
    Top10ForecastBuyers: Top10ForecastBuyersItem[];
    CommissionForecastByYearMonth: CommissionForecastByYearMonthItem[];
    CommissionForecast: CommissionForecastItem[];
    SalesTarget: SalesTargetItem;
    DownpaymentPercent: DownpaymentPercentItem;
    DeveloperSales: DeveloperSalesItem[];
}

export interface DashboardResponse {
    success: boolean;
    data: DashboardItem;
    message?: string;
}

export const getDashboardWeb = async (): Promise<DashboardResponse> => {
    const response = await axiosInstance.get<DashboardResponse>("/dashboard/web")
    return response.data;
}