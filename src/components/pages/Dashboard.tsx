"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Building,
  FolderClosed,
  Users,
  UsersRound,
  BanknoteArrowUp,
  CirclePercent,
  Coins,
  FolderKanban,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  DashboardItem,
  getDashboardWeb,
} from "@/services/dashboard/dashboard.api";
import { DivisionDashboard } from "./DivisionDashboard";
import { TeamDashboard } from "./TeamDashboard";
import { CollectionForecastDashboard } from "./CollectionForecast";
import Image from "next/image";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "divisions";
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardItem | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  console.log(dashboardData);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getDashboardWeb()
      .then((res) => {
        if (res.success) {
          setDashboardData(res.data);
        } else {
          console.error("Failed to fetch dashboard data:", res.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching dashboard data:", err);
        setError(err.message || "An error occured.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  const currentMonth = dashboardData?.KPI.totalSalesCurrentMonth ?? 0;
  const lastYearMonth = dashboardData?.KPI?.totalSalesLastMonth ?? 0;
  //const percentage = (currentMonth / lastYearMonth) * 100;

  const currentYear = dashboardData?.KPI.totalSalesCurrentYear ?? 0;
  const previousYear = dashboardData?.KPI?.totalSalesPreviousYear ?? 0;

  const handleTabChange = (value: string) => {
    router.replace(`/dashboard?tab=${value}`);
  };

  const now = new Date();

  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "long", // e.g., Monday
    month: "long", // e.g., October
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="h-full w-full px-2 space-y-4 pt-2">
      {/* <div className="mb-6 flex justify-between">
        <div className="">
          <div className="text-xl font-bold">Hello, System Administrator</div>
          <div className="text-sm text-muted-foreground">
            RCD Realty Marketing Corp — Improving Lives
          </div>
        </div>
        <div className="text-sm mt-1 justify-center items-center">
          {formattedDate}
        </div>
      </div> */}
      <div className="grid grid-cols-1 gap-4">
        <Card className="bg-primary md:col-span-2 rounded-md shadow-sm relative">
          <CardContent className="flex flex-col justify-center py-3 px-6 relative z-10">
            <div className="max-w-full">
              <h1 className="text-xl font-bold text-white mb-1">
                Welcome to RCD Realty Marketing Corp
              </h1>
              <p className="text-sm text-[#F1F1F1]">
                Manage properties, agents, and clients with ease —
              </p>
              <p className="text-sm text-[#F1F1F1]">
                all your real estate operations in one place
              </p>
            </div>
          </CardContent>

          <div className="absolute right-[155px] top-2/5 -translate-y-1/2 w-[310px] h-[220px] translate-x-1/2">
            <Image
              src="/rcd-dashboard.png"
              alt="RCD-Dashboard"
              fill
              className="object-contain"
            />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="grid grid-cols-1 gap-3">
          <Card className="bg-white border flex flex-col justify-center shadow-none rounded-md">
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-13 h-13 rounded-md bg-primary text-white border border-transparent">
                  <Users className="h-6 w-6" />
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="text-2xl font-semibold tracking-tight">
                    {dashboardData?.KPI.totalAgents.toLocaleString() ?? 0}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Total Active Salesforce
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border flex flex-col justify-center shadow-none not-user-invalid:rounded-md">
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-13 h-13 rounded-md bg-[#F28E2B] text-white border border-transparent">
                  <Building className="h-6 w-6" />
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="text-2xl font-semibold tracking-tight">
                    {dashboardData?.KPI.totalDivisions.toLocaleString() ?? 0}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Total Divisions
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border flex flex-col justify-center shadow-none rounded-md">
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-13 h-13 rounded-md bg-[#FFBE0B] text-white border border-transparent">
                  <FolderClosed className="h-6 w-6" />
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="text-2xl font-semibold tracking-tight">
                    {dashboardData?.KPI.totalProjects.toLocaleString() ?? 0}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Total Projects
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border flex flex-col justify-center shadow-none rounded-md">
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-13 h-13 rounded-md bg-[#76B041] text-white border border-transparent">
                  <UsersRound className="h-6 w-6" />
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="text-2xl font-semibold tracking-tight">
                    {dashboardData?.KPI.totalDevelopers.toLocaleString() ??
                      0}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Total Developers
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-2">
          <Card className="bg-transparent border-none flex flex-col justify-center shadow-none">
            <CardContent>
              <div className="mb-5">
                <CardTitle className="text-xl font-semibold">
                  Monthly Sales Comparison
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Showing total sales comparison in previous month and current month
                </CardDescription>
              </div>

              {(() => {
                // normalize bar widths (relative to highest value)
                const maxValue = Math.max(currentMonth, lastYearMonth);
                const currentWidth = (currentMonth / maxValue) * 100;
                const previousWidth = (lastYearMonth / maxValue) * 100;

                return (
                  <div className="space-y-5">
                    <div className="flex flex-col gap-2">
                      <Badge
                        variant="secondary"
                        className="px-2 py-0.5 text-xs flex items-center gap-1 bg-primary/20 text-primary"
                      >
                        <span className="h-2 w-2 rounded-full bg-primary/70 mr-1"></span>
                        Sales Current Month:
                        <span className="ml-2 font-medium">
                          {currentMonth.toLocaleString()}
                        </span>
                      </Badge>
                      <div className="w-full flex rounded-full overflow-hidden">
                        <div
                          className="h-4 bg-primary"
                          style={{ width: `${currentWidth}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-xs">
                        <div className="px-2 py-0.5 flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-primary/30 mr-1"></span>
                          Sales Previous Month:
                          <span className="ml-2 font-medium">
                            {lastYearMonth.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="w-full flex rounded-full overflow-hidden">
                        <div
                          className="h-4 bg-primary/70"
                          style={{ width: `${previousWidth}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>

          {/* horizontal line */}
         <hr className="border-t border-gray-300 w-auto my-3 mx-4" />
          
          <Card className="bg-transparent border-none flex flex-col justify-center shadow-none">
            <CardContent>
              <div className="mb-5">
                <CardTitle className="text-xl font-semibold">
                  Yearly Sales Comparison
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Showing total sales comparison in previous year and current year
                </CardDescription>
              </div>

              {(() => {
                // normalize bar widths (relative to highest value)
                const maxValueYear = Math.max(currentYear, previousYear);
                const currentWidthYear = (currentYear / maxValueYear) * 100;
                const previousWidthYear = (previousYear / maxValueYear) * 100;

                return (
                  <div className="space-y-5">
                    <div className="flex flex-col gap-2">
                      <Badge
                        variant="secondary"
                        className="px-2 py-0.5 text-xs flex items-center gap-1 bg-primary/20 text-primary"
                      >
                        <span className="h-2 w-2 rounded-full bg-primary/70 mr-1"></span>
                        Sales Current Year:
                        <span className="ml-2 font-medium">
                          {currentYear.toLocaleString()}
                        </span>
                      </Badge>
                      <div className="w-full flex rounded-full overflow-hidden">
                        <div
                          className="h-4 bg-primary"
                          style={{ width: `${currentWidthYear}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-xs">
                        <div className="px-2 py-0.5 flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-primary/30 mr-1"></span>
                          Sales Previous Year:
                          <span className="ml-2 font-medium">
                            {previousYear.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="w-full flex rounded-full overflow-hidden">
                        <div
                          className="h-4 bg-primary/70"
                          style={{ width: `${previousWidthYear}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full border-none"
        >
          <div className="mt-5 flex items-center space-x-4 px-3 py-3">
            <FolderKanban className="w-6 h-6 text-primary mt-1" />
            <div className="inline-block leading-tight">
              <CardTitle className="text-lg font-semibold">
                Data Analytics and Reports
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Showing analytic reports on a variety of topics
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center justify-start mb-4 pt-3 border-b">
            <TabsList className="w-auto bg-transparent border-none p-0 flex justify-between space-x-4 text-sm">
              <TabsTrigger value="divisions">
                {/* <CirclePercent className="h-4 w-4 mr-0.5" />  */}
                Division Sales
              </TabsTrigger>
              <TabsTrigger value="team">
                {/* <UsersRound className="h-4 w-4 mr-0.5" />  */}
                Team Sales
              </TabsTrigger>
              <TabsTrigger value="forecast">
                {/* <BanknoteArrowUp className="h-4 w-4 mr-0.5" />  */}
                Collection Forecast
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="divisions">
            <DivisionDashboard
              loading={loading}
              DivisionSales={dashboardData?.DivisionSales}
              TotalSalesTarget={dashboardData?.SalesTarget}
              top10Division={dashboardData?.Top10Divisions}
            />
          </TabsContent>
          <TabsContent value="team">
            <TeamDashboard
              DeveloperSales={dashboardData?.DeveloperSales}
              Top10SalesPerson={dashboardData?.Top10SalesPersons}
              Top10UnitManager={dashboardData?.Top10UnitManagers}
            />
          </TabsContent>
          <TabsContent value="forecast">
            <CollectionForecastDashboard
              Top10ForecastBuyers={dashboardData?.Top10ForecastBuyers}
              CommissionForecastByYearMonth={dashboardData?.CommissionForecastByYearMonth}
              CommissionForecast={dashboardData?.CommissionForecast}
              DownpaymentPercent={dashboardData?.DownpaymentPercent}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
