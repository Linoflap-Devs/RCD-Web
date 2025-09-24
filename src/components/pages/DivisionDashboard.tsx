"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
  AreaChart,
  Area,
  LabelList,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useState } from "react";
import { ChartBar, Search, Table } from "lucide-react";
import DatePickerMonthYear from "../../components/ui/datepicker";
import { DataTable } from "../ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Input } from "../ui/input";
import { DivisionSalesItem, SalesTargetItem, Top10DivisionsItem } from "@/services/dashboard/dashboard.api";

type Agents = {
  id: string;
  name: string;
  properties?: number;
  division: string;
  divisions?: string;
};

const columns: ColumnDef<Agents>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-justify">ID</div>,
    cell: ({ row }) => (
      <div className="text-justify">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: () => <div className="text-justify">Name</div>,
    cell: ({ row }) => (
      <div className="text-justify">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "division",
    header: () => <div className="text-justify">Division</div>,
    cell: ({ row }) => (
      <div className="text-justify">{row.getValue("division")}</div>
    ),
  },
  {
    accessorKey: "properties",
    header: "Properties Assigned",
    cell: ({ row }) => row.getValue("properties") ?? 0,
  },
  {
    accessorKey: "divisions",
    header: "Divisions Assigned",
    cell: ({ row }) => row.getValue("divisions") ?? "N/A",
  },
];

const data: Agents[] = [
  { id: "1", name: "Juan Dela Cruz", division: "Living Hope Division" },
  { id: "2", name: "Carlos Santos", division: "Living Hope Division" },
  { id: "3", name: "Juan Dela Cruz", division: "Living Hope Division" },
  { id: "4", name: "Carlos Santos", division: "Living Hope Division" },
  { id: "1", name: "Juan Dela Cruz", division: "Living Hope Division" },
  { id: "2", name: "Carlos Santos", division: "Living Hope Division" },
  { id: "3", name: "Juan Dela Cruz", division: "Living Hope Division" },
  { id: "4", name: "Carlos Santos", division: "Living Hope Division" },
  { id: "1", name: "Juan Dela Cruz", division: "Living Hope Division" },
  { id: "2", name: "Carlos Santos", division: "Living Hope Division" },
  { id: "3", name: "Juan Dela Cruz", division: "Living Hope Division" },
  { id: "4", name: "Carlos Santos", division: "Living Hope Division" },
  { id: "1", name: "Juan Dela Cruz", division: "Living Hope Division" },
  { id: "2", name: "Carlos Santos", division: "Living Hope Division" },
  { id: "3", name: "Juan Dela Cruz", division: "Living Hope Division" },
  { id: "4", name: "Carlos Santos", division: "Living Hope Division" },
];

// chartConfig.ts
export const chartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface DivisionDashboardProps {
  loading: boolean;
  top10Division?: Top10DivisionsItem[];
  DivisionSales?: DivisionSalesItem[];
  TotalSalesTarget?: SalesTargetItem[];
}

export function DivisionDashboard({
  top10Division,
  DivisionSales,
  TotalSalesTarget
}: DivisionDashboardProps) {
  const [view, setView] = useState("chart");
  const [searchTerm, setSearchTerm] = useState("");
  console.log('total sales target ', TotalSalesTarget);

  const colors = [
    "#D75C3C", "#F28E2B", "#FFBE0B", "#E15759", "#FF9F1C",
    "#76B041", "#FAA43A", "#F4D35E", "#C6AC8F", "#8D99AE"
  ];

  const top10Divisions = (top10Division ?? []).map((d, index) => ({
    name: d.Division,
    sales: d.CurrentMonth,
    fill: colors[index % colors.length],
  }));

  const sortedDivisions = [...top10Divisions].sort((a, b) => b.sales - a.sales);

  // DIVISION SALES
  const divisionsSalesData = (DivisionSales ?? []).map((d) => ({
    division: d.Division,
    Current: d.CurrentMonth, // not yet dynamic
    Last: d.LastMonth, // not yet dynamic
  }));

  // Adjusted mapped data
  const divisionsData = (TotalSalesTarget ?? []).map((d) => {
    const monthTarget = d.TargetMonth ?? 0;
    const monthActual = d.CurrentMonth ?? 0;

    const monthTargetReach =
      monthTarget > 0 ? Math.round((monthActual / monthTarget) * 100) : 0;

    return {
      division: d.DivisionName,
      monthTarget,
      monthActual,
      monthTargetReach, // not yet dynamic
    };
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-stretch">
        <Card className="col-span-4 rounded-lg border bg-white shadow-none">
          <CardHeader className="flex items-center justify-between gap-1 border-b">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-primary">Top 10 Division</CardTitle>
              <CardDescription>Monthly Sales</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <DatePickerMonthYear />
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-0.5">
              {sortedDivisions.slice(0, 5).map((division, index) => {
                return (
                  <div
                    key={division.name}
                    className="relative flex items-center justify-between px-2 py-1 rounded-lg transition-all hover:bg-primary/10"
                  >
                    <div
                      style={{ backgroundColor: division.fill }}
                      className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-medium flex-shrink-0"
                    >
                      {index + 1}
                    </div>

                    <div className="relative z-10 flex-1 px-2 text-sm font-medium text-foreground truncate">
                      {division.name}
                    </div>

                    <div className="relative z-10 text-sm font-semibold text-primary">
                      {division.sales.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-0.5">
              {sortedDivisions.slice(5, 10).map((division, index) => {
                return (
                  <div
                    key={division.name}
                    className="relative flex items-center justify-between px-2 py-1 rounded-lg transition-all hover:bg-primary/10"
                  >

                    <div
                      style={{ backgroundColor: division.fill }}
                      className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-medium flex-shrink-0"
                    >
                      {index + 6}
                    </div>

                    <div className="relative z-10 flex-1 px-2 text-sm font-medium text-foreground truncate">
                      {division.name}
                    </div>

                    <div className="relative z-10 text-sm font-semibold text-primary">
                      {division.sales.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-x-auto rounded-lg shadow-none">
        <CardHeader className="mb-3 items-center gap-2 px-6 border-b">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-primary">Total Target Sales</CardTitle>
              <CardDescription>Monthly Sales</CardDescription>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 sm:ml-[30rem]">
              <div className="col-span-2 relative z-30 flex flex-col px-6 justify-center text-left border border-primary rounded-lg">
                <div className="flex divide-x divide-gray-300">
                  <div className="flex-1 flex flex-col gap-0.3">
                    <span className="text-primary text-xs block">Total Target</span>
                    <span className="text-primary text-lg font-bold sm:text-2xl">89%</span>
                  </div>
                  <div className="flex-1 pl-4 flex flex-col gap-0.3">
                    <span className="text-primary text-xs block">Total Actual</span>
                    <span className="text-primary text-lg font-bold sm:text-2xl">120%</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#76B041] rounded-lg p-4 flex-1 pl-4 flex flex-col gap-0.3">
                <span className="text-white text-xs block">Total Reach</span>
                <span className="text-white text-base font-bold sm:text-2xl">120%</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-64 min-w-[800px]">
          <ChartContainer
            className="h-full w-full"
            config={{
              target: { label: "Month Target", color: "var(--chart-1)" },
              actual: { label: "Month Actual", color: "var(--chart-2)" },
            }}
          >
            <BarChart
              data={divisionsData}
              margin={{ top: 20, right: 20, left: 0, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="division"
                tickLine={false}
                axisLine={false}
                interval={0}
                angle={-35}
                textAnchor="end"
              />
              <YAxis />
              <Tooltip
                content={({ payload, label }) => {
                  if (!payload || payload.length === 0) return null;
                  const data = payload[0].payload;
                  const formatter = new Intl.NumberFormat("en-US");

                  return (
                    <div className="bg-white p-2 rounded shadow-lg border border-gray-200">
                      <div className="font-semibold mb-2">{data.division}</div>

                      {/* Target */}
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="w-3 h-3 block rounded-xs"
                          style={{ backgroundColor: "var(--chart-1)" }}
                        ></span>
                        <span>
                          Target - Month:&nbsp;
                          <span className="font-semibold text-md">
                            {formatter.format(data.monthTarget)}
                          </span>
                        </span>
                      </div>

                      {/* Actual */}
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="w-3 h-3 block rounded-xs"
                          style={{ backgroundColor: "var(--chart-2)" }}
                        ></span>
                        <span>
                          Actual - Month:&nbsp;
                          <span className="font-semibold text-md">
                            {formatter.format(data.monthActual)}
                          </span>
                        </span>
                      </div>

                      {/* Reach */}
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 block rounded-xs bg-[#76B041]"></span>
                        <span>Target Reach: {data.monthTargetReach}%</span>
                      </div>
                    </div>
                  );
                }}
              />
              <Bar
                dataKey="monthTarget"
                stackId="a"
                fill="var(--chart-2)"
                radius={[4, 4, 4, 4]}
              />
              <Bar
                dataKey="monthActual"
                stackId="a"
                fill="var(--chart-1)"
                radius={[4, 4, 4, 4]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="overflow-x-auto rounded-lg gap-0 shadow-none">
        <CardHeader className="mb-3 flex items-center justify-between gap-2 mt-4">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-primary">
              Division Sales <span className="text-muted-foreground">(30)</span>
            </CardTitle>
            <CardDescription>Monthly Sales</CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Monthly" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="currentMonth">Monthly</SelectItem>
                <SelectItem value="lastMonth">Quarterly</SelectItem>
                <SelectItem value="currentQuarter">Yearly</SelectItem>
              </SelectContent>
            </Select>

            <div className="inline-flex bg-white border rounded-xl p-[3px] h-9">
              <button
                className={`flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-md transition-colors ${view === "chart"
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:bg-gray-50"
                  }`}
                onClick={() => setView("chart")}
              >
                <ChartBar className="w-3 h-3" />
              </button>
              <button
                className={`flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-md transition-colors ${view === "table"
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:bg-gray-50"
                  }`}
                onClick={() => setView("table")}
              >
                <Table className="w-3 h-3" />
              </button>
            </div>
          </div>
        </CardHeader>

        {view === "chart" ? (
          <CardContent className="h-75 min-w-[800px] my-4">
            <ChartContainer
              className="h-full w-full"
              config={{
                target: { label: "Current Month", color: "var(--chart-1)" },
                actual: { label: "Current Year", color: "var(--chart-2)" },
              }}
            >
              <AreaChart
                data={divisionsSalesData}
                margin={{ top: 20, right: 20, left: 0, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="division"
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                  angle={-35}
                  textAnchor="end"
                />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />

                <Area
                  type="step"
                  dataKey="Current"
                  stroke="var(--chart-2)"
                  fill="var(--chart-2)"
                  fillOpacity={0.7}
                  activeDot={{ r: 5 }}
                />
                <Area
                  type="step"
                  dataKey="Last"
                  stroke="var(--chart-1)"
                  fill="var(--chart-1)"
                  fillOpacity={0.7}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        ) : (
          <CardContent className="overflow-x-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-col md:flex-row items-center gap-3 mt-3 mb-4">
                <div className="relative rounded-lg">
                  <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-7 text-xs sm:text-sm h-8 w-90"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <DataTable data={data} columns={columns} />
          </CardContent>
        )}
      </Card>
    </div>
  );
}
