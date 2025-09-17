"use client"

import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import DivisionDashboard from "./DivisionDashboard";

export default function Dashboard() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const currentTab = searchParams.get("tab") || "divisions"

  const currentMonth = 189
  const lastYearMonth = 89
  const percentage = (currentMonth / lastYearMonth) * 100
  
  const handleTabChange = (value: string) => {
    router.replace(`/dashboard?tab=${value}`)
  }

  return (
    <div className="h-full w-full p-2 space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">
        <Card className="rounded-lg border shadow-none flex flex-col justify-center">
          <CardContent className="flex flex-col gap-2">
            <div className="text-sm">Total Active Salesforce</div>
            <div className="text-3xl font-bold tracking-tight text-primary">4,682</div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border shadow-none flex flex-col justify-center">
          <CardContent className="flex flex-col gap-2">
            <div className="text-sm">Total Active Divisions</div>
            <div className="text-3xl font-bold tracking-tight text-primary">4,682</div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border shadow-none flex flex-col justify-center">
          <CardContent className="flex flex-col gap-2">
            <div className="text-sm">Total Sales Previous Year</div>
            <div className="text-3xl font-bold tracking-tight text-primary">4,682</div>
          </CardContent>
        </Card>

        <Card className="flex flex-col col-span-2 rounded-lg shadow-none gap-2 relative overflow-hidden bg-primary text-white">
          <div className="items-center px-6 relative z-10">
            <div className="pb-0 text-sm mb-2">Sales Monthly Performance</div>
          </div>
          <CardContent className="flex flex-col gap-3 w-full px-6 relative z-10">
            <div className="w-full flex rounded-full overflow-hidden">
              <div
                className="h-2 bg-white/70"
                style={{ width: `${lastYearMonth}%` }}
              ></div>
              <div
                className="h-2 bg-white/30"
                style={{ width: `${currentMonth}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs">
              <Badge variant="secondary" className="px-2 py-0.5 flex items-center gap-1 bg-white/20 text-white">
                <span className="h-2 w-2 rounded-full bg-white/70 mr-1"></span>
                Current Month: <span className="ml-1 font-medium">{currentMonth}</span>
              </Badge>
              <div className="px-2 py-0.5 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-white/30 mr-1"></span>
                Previous Month: <span className="ml-1 font-medium">{lastYearMonth}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
          <div className="flex items-center justify-start mb-4 pt-5">
            <h1 className="text-xl font-bold mr-4">Division Sales Overview</h1>
            <TabsList className="w-auto">
              <TabsTrigger value="divisions">Division Sales</TabsTrigger>
              <TabsTrigger value="people">Developers</TabsTrigger>
              <TabsTrigger value="forecast">Collection Forecast</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="divisions">
            <DivisionDashboard />
          </TabsContent>
          <TabsContent value="people">
            <div className="p-4 rounded-lg border">📊 Sales Chart here</div>
          </TabsContent>
          <TabsContent value="forecast">
            <div className="p-4 rounded-lg border">📊 Sales Chart here</div>
          </TabsContent>
        </Tabs>
      </div>

    </div>
  );
}
