"use client";

import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import DivisionDashboard from "./DivisionDashboard";
import { TrendingUp } from "lucide-react";
import TeamDashboard from "./TeamDashboard";
import CollectionForecastDashboard from "./CollectionForecast";
import Image from "next/image";
import { useState } from "react";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeTab = searchParams.get("tab") || "divisions";

  const currentMonth = 15520177.74;
  const lastYearMonth = 5556277.74;
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
    <div className="h-full w-full p-2 mt-4 space-y-3">
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

        {/* Card 2 - normal width */}
        <Card className="bg-primary rounded-lg border  flex flex-col justify-center">
          <CardContent className="flex flex-col gap-2">
            <div className="space-y-1">
              <div className="text-sm text-white">Total Active Salesforce</div>
              <div className="text-2xl text-white font-bold tracking-tight flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 " /> <span>2,400</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">
        <Card className="rounded-lg border flex flex-col justify-center shadow-none">
          <CardContent className="flex flex-col gap-2">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Total Active Divisions</div>
              <div className="text-2xl font-bold tracking-tight text-primary flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" /> <span>2,400</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border flex flex-col justify-center shadow-none">
          <CardContent className="flex flex-col gap-2">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Total Active Agents</div>
              <div className="text-2xl font-bold tracking-tight text-primary flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" /> <span>30</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border flex flex-col justify-center shadow-none">
          <CardContent className="flex flex-col gap-2">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Total Sales Previous Year</div>
              <div className="text-2xl font-bold tracking-tight text-primary flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" /> <span>155,620,177.74</span>
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
            <h1 className="text-xl font-bold mr-4">{titleMap[activeTab]}</h1>
            <TabsList className="w-auto">
              <TabsTrigger value="divisions">Division Sales</TabsTrigger>
              <TabsTrigger value="team">Team Sales</TabsTrigger>
              <TabsTrigger value="forecast">Collection Forecast</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="divisions">
            <DivisionDashboard />
          </TabsContent>
          <TabsContent value="team">
            <TeamDashboard />
          </TabsContent>
          <TabsContent value="forecast">
            <CollectionForecastDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
