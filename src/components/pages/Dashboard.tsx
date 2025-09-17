"use client"

import { Building, TrendingUp, User, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";


export default function Dashboard() {
  const currentMonth = 189 // example: current month sales
  const lastYearMonth = 89 // example: last year's same month sales
  const percentage = (currentMonth / lastYearMonth) * 100

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

        <Card className="flex flex-col col-span-2 rounded-lg border shadow-none gap-2">
          <div className="items-center px-6">
            <div className="pb-0 text-sm mb-2">Sales Monthly Performance</div>
          </div>
          <CardContent className="flex flex-col gap-3 w-full px-6">
            <div className="w-full flex rounded-full overflow-hidden">
              <div
                className="h-2 bg-primary"
                style={{ width: `${lastYearMonth}%` }}
              ></div>
              <div
                className="h-2 bg-muted-foreground/20"
                style={{ width: `${currentMonth}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs">
              <Badge variant="secondary" className="px-2 py-0.5 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-primary mr-1"></span>
                Current: <span className="ml-1 font-medium text-foreground">{currentMonth}</span>
              </Badge>
              <div className="px-2 py-0.5 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-muted-foreground/20 mr-1"></span>
                Last Year: <span className="ml-1 font-medium text-foreground">{lastYearMonth}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
