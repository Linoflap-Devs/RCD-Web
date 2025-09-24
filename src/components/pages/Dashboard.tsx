"use client";

import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { Building, Coins, FolderKanban, UserStar } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DashboardItem, getDashboardWeb } from "@/services/dashboard/dashboard.api";
import { DivisionDashboard } from "./DivisionDashboard";
import { TeamDashboard } from "./TeamDashboard";
import { CollectionForecastDashboard } from "./CollectionForecast";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "divisions";
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardItem | undefined>(undefined);
  const [error, setError] = useState(false);

  useEffect(() => {
    getDashboardWeb()
      .then((res) => {
        if (res.success) {
          setDashboardData(res.data);
        } else {
          console.error("Failed to fetch dashboard data:", res.message);
        }
      })
      .catch((err) => console.error("Error fetching dashboard data:", err));
  }, []);

  console.log(dashboardData?.Top10Divisions);

  console.log(dashboardData);

  const currentMonth = dashboardData?.KPI.totalSalesCurrentMonth ?? 0;
  const lastYearMonth = dashboardData?.KPI?.totalSalesCurrentMonth ?? 0;
  //const percentage = (currentMonth / lastYearMonth) * 100;

  const handleTabChange = (value: string) => {
    router.replace(`/dashboard?tab=${value}`);
  };

  const titleMap: Record<string, string> = {
    divisions: "Division Sales Report",
    team: "Team Sales Report",
    forecast: "Collection Forecast Report"
  }

  return (
    <div className="h-full w-full mt-3 px-2 space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary md:col-span-2 rounded-lg shadow-sm relative">
          <CardContent className="flex flex-col justify-center py-4 px-6 relative z-10">
            <div className="max-w-md">
              <h1 className="text-xl font-bold text-white mb-1">
                Welcome to RCD Realty Marketing Corp
              </h1>
              <p className="text-sm text-[#F1F1F1]">
                Manage properties, agents, and clients with ease —
              </p>
              <p className="text-sm text-[#F1F1F1]">
                all your real estate operations in one place.
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

        <Card className="bg-primary rounded-lg border  flex flex-col justify-center">
          <CardContent className="flex flex-col gap-2">
            <div className="space-y-1">
              <div className="text-sm text-white">Total Sales Force</div>
              <div className="text-2xl text-white font-bold tracking-tight flex items-center">
                <UserStar className="h-4 w-4 mr-2 " /> <span>{dashboardData?.KPI.totalAgents.toLocaleString() ?? 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 items-stretch">
        <Card className="bg-white rounded-lg border flex flex-col justify-center shadow-none">
          <CardContent className="flex flex-col gap-2">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Total Active Divisions</div>
              <div className="text-2xl font-bold tracking-tight text-primary flex items-center">
                <Building className="h-4 w-4 mr-2" /> <span>{dashboardData?.KPI.totalDivisions.toLocaleString() ?? 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border flex flex-col justify-center shadow-none">
          <CardContent className="flex flex-col gap-2">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Total Projects</div>
              <div className="text-2xl font-bold tracking-tight text-primary flex items-center">
                <FolderKanban className="h-4 w-4 mr-2" /> <span>{dashboardData?.KPI.totalProjects.toLocaleString() ?? 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border flex flex-col justify-center shadow-none">
          <CardContent className="flex flex-col gap-2">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Total Sales Previous Year</div>
              <div className="text-2xl font-bold tracking-tight text-primary flex items-center">
                <Coins className="h-4 w-4 mr-2" /> <span>{dashboardData?.KPI.totalSalesPreviousYear.toLocaleString() ?? 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col col-span-2 rounded-lg  gap-4 relative overflow-hidden text-primary shadow-none">
          {(() => {
            // normalize bar widths (relative to highest value)
            const maxValue = Math.max(currentMonth, lastYearMonth);
            const currentWidth = (currentMonth / maxValue) * 100;
            const previousWidth = (lastYearMonth / maxValue) * 100;

            return (
              <>
                {/* Row: Current Month */}
                <div className="flex flex-col gap-1 px-6">
                  <div className="flex justify-between text-xs pb-1">
                    <Badge
                      variant="secondary"
                      className="px-2 py-0.5 flex items-center gap-1 bg-primary/20 text-primary"
                    >
                      <span className="h-2 w-2 rounded-full bg-primary/70 mr-1"></span>
                      Sales Current Month:
                      <span className="ml-2 font-medium">{currentMonth.toLocaleString()}</span>
                    </Badge>
                  </div>
                  <div className="w-full flex rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-primary/70"
                      style={{ width: `${currentWidth}%` }}
                    ></div>
                  </div>
                </div>

                {/* Row: Previous Month */}
                <div className="flex flex-col gap-1 px-6">
                  <div className="flex justify-between text-xs">
                    <div className="px-2 py-0.5 flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-primary/30 mr-1"></span>
                      Sales Previous Month:
                      <span className="ml-2 font-medium">{lastYearMonth.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="w-full flex rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-primary/30"
                      style={{ width: `${previousWidth}%` }}
                    ></div>
                  </div>
                </div>
              </>
            );
          })()}
        </Card>
      </div>

      <div>
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="flex items-center justify-start mb-4 pt-4">
            <h1 className="text-lg font-semibold ml-1 mr-4">{titleMap[activeTab]}</h1>
            <TabsList className="w-auto">
              <TabsTrigger value="divisions">Division Sales</TabsTrigger>
              <TabsTrigger value="team">Team Sales</TabsTrigger>
              <TabsTrigger value="forecast">Collection Forecast</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="divisions">
            <DivisionDashboard
              loading={loading}
              top10Division={dashboardData?.Top10Divisions}
              DivisionSales={dashboardData?.DivisionSales}
              TotalSalesTarget={dashboardData?.SalesTarget}
            />
          </TabsContent>
          <TabsContent value="team">
            <TeamDashboard
              Top10SalesPersons={dashboardData?.Top10SalesPersons}
              Top10UnitManagers={dashboardData?.Top10UnitManagers}
            //Top10DeveloperSales={dashboardData?.Top}
            />
          </TabsContent>
          <TabsContent value="forecast">
            <CollectionForecastDashboard
              Top10ForecastBuyers={dashboardData?.Top10ForecastBuyers}
              CommissionForecastByYearMonth={dashboardData?.CommissionForecastByYearMonth}
              CommissionForecast={dashboardData?.CommissionForecast}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
