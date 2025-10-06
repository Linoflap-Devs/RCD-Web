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
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "../../components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useState, useEffect } from "react";
import { ChartBar, FileChartColumnIncreasingIcon, Search, SquareMousePointer, Table, TargetIcon } from "lucide-react";
import { DataTable } from "../ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Input } from "../ui/input";
import { DivisionSalesItem, SalesTargetItem } from "@/services/dashboard/dashboard.api";
import { useDebounce } from "@/hooks/use-debounce";
import { getTop10Divisions, Top10DivisionsItem } from "@/services/divisions/division.api";
import { MonthYearPicker } from "../ui/monthyearpicker";

const columnsSalesItem: ColumnDef<DivisionSalesItem>[] = [
  {
    accessorKey: "Division",
    header: () => <div className="text-justify">Division</div>,
    cell: ({ row }) => (
      <div className="text-justify">{row.getValue("Division")}</div>
    ),
  },
  {
    accessorKey: "CurrentMonth",
    header: () => <div className="text-justify">CurrentMonth</div>,
    cell: ({ row }) =>
      row.getValue("CurrentMonth")
        ? (row.getValue("CurrentMonth") as number).toLocaleString()
        : "0",
  },
  {
    accessorKey: "CurrentMonthLastYear",
    header: () => <div className="text-justify">Current Month Last Year</div>,
    cell: ({ row }) =>
      row.getValue("CurrentMonthLastYear")
        ? (row.getValue("CurrentMonthLastYear") as number).toLocaleString()
        : "0",
  },
  {
    accessorKey: "CurrentQuarter",
    header: () => <div className="text-justify">Current Quarter</div>,
    cell: ({ row }) =>
      row.getValue("CurrentQuarter")
        ? (row.getValue("CurrentQuarter") as number).toLocaleString()
        : "0",
  },
  {
    accessorKey: "LastQuarter",
    header: () => <div className="text-justify">Last Quarter</div>,
    cell: ({ row }) =>
      row.getValue("LastQuarter")
        ? (row.getValue("LastQuarter") as number).toLocaleString()
        : "0",
  },
  {
    accessorKey: "CurrentYear",
    header: () => <div className="text-justify">Current Year</div>,
    cell: ({ row }) =>
      row.getValue("CurrentMonth")
        ? (row.getValue("CurrentMonth") as number).toLocaleString()
        : "0",
  },
  {
    accessorKey: "LastYear",
    header: () => <div className="text-justify">Last Year</div>,
    cell: ({ row }) =>
      row.getValue("LastYear")
        ? (row.getValue("LastYear") as number).toLocaleString()
        : "0",
  },
];

export const chartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface DivisionDashboardProps {
  loading: boolean;
  DivisionSales?: DivisionSalesItem[];
  TotalSalesTarget?: SalesTargetItem;
  top10Division?: Top10DivisionsItem[];
}

export function DivisionDashboard({
  top10Division,
  DivisionSales,
  TotalSalesTarget
}: DivisionDashboardProps) {
  const [view, setView] = useState("chart");
  const [searchTerm, setSearchTerm] = useState("");
  const [divisionLoading, setDivisionLoading] = useState(false);
  const [divisionError, setDivisionError] = useState<string | null>(null);

  const [Top10DivisionData, setTop10DivisionData] = useState<Top10DivisionsItem[]>([]);
  const [selectedTop10DivisionDate, setSelectedTop10DivisionDate] = useState<Date | undefined>(new Date());
  const [selectGranularityDivisionSales, setSelectGranularityDivisionSales] = useState<"monthly" | "quarterly" | "yearly">("monthly");
  const [selectGranularityTargetSales, setSelectGranularityTargetSales] = useState<"monthly" | "quarterly" | "yearly">("monthly");

  useEffect(() => {
    if (!selectedTop10DivisionDate) return;

    setDivisionLoading(true);
    setDivisionError(null);

    const formatted = selectedTop10DivisionDate.toISOString().split("T")[0]; // yyyy-mm-dd

    getTop10Divisions(formatted)
      .then((res) => {
        if (res.success) {
          setTop10DivisionData(res.data);
        } else {
          console.error("Failed to fetch top 10 divisions data:", res.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching top 10 divisions data:", err);
        setDivisionError(err.message || "An error occured.");
      })
      .finally(() => {
        setDivisionLoading(false);
      });
  }, [selectedTop10DivisionDate]);

  const divisionSalesData = DivisionSales?.map((d) => ({
    division: d.Division,
    Current:
      selectGranularityDivisionSales === "monthly"
        ? d.CurrentMonth
        : selectGranularityDivisionSales === "quarterly"
          ? d.CurrentQuarter
          : selectGranularityDivisionSales === "yearly"
            ? d.CurrentYear
            : 0,
    Last:
      selectGranularityDivisionSales === "monthly"
        ? d.CurrentMonthLastYear
        : selectGranularityDivisionSales === "quarterly"
          ? d.LastQuarter
          : selectGranularityDivisionSales === "yearly"
            ? d.LastYear
            : 0,
  })) ?? [];

  const targetSalesData = TotalSalesTarget?.Divisions.map((d) => ({
    name: d.DivisionName,
    monthTarget:
      selectGranularityTargetSales === "monthly"
        ? d.TargetMonth
        : selectGranularityTargetSales === "yearly"
          ? d.TargetYear
          : 0,
    monthActual:
      selectGranularityTargetSales === "monthly"
        ? d.CurrentMonth
        : selectGranularityTargetSales === "yearly"
          ? d.CurrentYear
          : 0,
    monthTargetReach:
      selectGranularityTargetSales === "monthly"
        ? d.PercentMonth
        : selectGranularityTargetSales === "yearly"
          ? d.PercentYear
          : 0,
  })) ?? [];

  const colors = [
    "#D75C3C", "#F28E2B", "#FFBE0B", "#E15759", "#FF9F1C",
    "#76B041", "#FAA43A", "#F4D35E", "#C6AC8F", "#8D99AE"
  ];

  const top10Divisions = ((Top10DivisionData?.length ?? 0) > 0
    ? Top10DivisionData
    : top10Division
  )?.map((d, index) => ({
    name: d.Division,
    sales: d.CurrentMonth,
    fill: colors[index % colors.length],
  })) ?? [];

  const sortedDivisions = [...top10Divisions].sort((a, b) => b.sales - a.sales);
  const totalDivisions = (DivisionSales ?? []).flatMap(item => item.Division ?? []).length;

  const debouncedSearch = useDebounce(searchTerm, 400);

  const regex = new RegExp(debouncedSearch, "i");

  const filteredDivisionSales = DivisionSales?.filter((item) => {
    const division = item.Division ?? "";
    return regex.test(division);
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 items-stretch">
        <Card className="bg-white border flex flex-col justify-center shadow-none rounded-md">
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-15 h-14 rounded-sm text-primary">
                <TargetIcon className="h-8 w-8" />
              </div>
              <div className="flex flex-col space-y-1">
                <div className="text-2xl font-semibold tracking-tight">{TotalSalesTarget?.TotalTargetMonth.toLocaleString() ?? 0}</div>
                <div className="text-xs text-muted-foreground">Total Sales Target</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border flex flex-col justify-center shadow-none rounded-md">
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-15 h-14 rounded-sm text-primary">
                <FileChartColumnIncreasingIcon className="h-8 w-8" />
              </div>
              <div className="flex flex-col space-y-1">
                <div className="text-2xl font-semibold tracking-tight">{TotalSalesTarget?.TotalCurrentMonth.toLocaleString() ?? 0}</div>
                <div className="text-xs text-muted-foreground">Total Actual Target</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#76B041] border flex flex-col justify-center shadow-none rounded-md">
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-15 h-14 rounded-sm text-white">
                <SquareMousePointer className="h-8 w-8" />
              </div>
              <div className="flex flex-col space-y-1">
                <div className="text-2xl font-semibold tracking-tight text-white">{TotalSalesTarget?.TotalReachPercent.toLocaleString() ?? 0}</div>
                <div className="text-xs text-white">Total Reach</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-x-auto rounded-lg shadow-none pb-6">
        <CardHeader className="flex items-center justify-between py-1 border-b">
          <div className="flex flex-1 flex-col justify-center gap-1 sm:pb-0">
            <CardTitle className="font-semibold">
              Total Sales Target
            </CardTitle>
            <CardDescription className="font-normal">
              Showing the total sales target for the current month
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={selectGranularityTargetSales}
              onValueChange={(val) => setSelectGranularityTargetSales(val as "monthly" | "quarterly" | "yearly")}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select Granularity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="h-90 min-w-[800px]">
          <ChartContainer
            className="h-full w-full"
            config={{
              target: { label: "Month Target", color: "var(--chart-1)" },
              actual: { label: "Month Actual", color: "var(--chart-2)" },
            }}
          >
            <BarChart
              data={targetSalesData}
              margin={{ top: 40, right: 20, left: 0, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
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
                      <div className="font-semibold mb-2">{data.name}</div>

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
                fill="var(--chart-1)"
                radius={[4, 4, 4, 4]}
              />
              <Bar
                dataKey="monthActual"
                stackId="a"
                fill="var(--chart-2)"
                radius={[4, 4, 4, 4]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch">
        <Card className="col-span-4 rounded-md border bg-white shadow-none">
          <CardHeader className="flex items-center justify-between py-1 border-b">
            <div className="flex flex-1 flex-col justify-center gap-1 sm:pb-0">
              <CardTitle className="font-semibold">
                Top 10 Divisions
              </CardTitle>
              <CardDescription className="font-normal">
                Showing the top 10 division for the current month
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <MonthYearPicker value={selectedTop10DivisionDate} onChange={setSelectedTop10DivisionDate} />
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-1">
              {sortedDivisions.slice(0, 5).map((division, index) => {
                return (
                  <div
                    key={division.name}
                    className="relative flex items-center justify-between px-2 py-1.5 transition-all hover:bg-primary/10"
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
            <div className="flex flex-col gap-1.5">
              {sortedDivisions.slice(5, 10).map((division, index) => {
                return (
                  <div
                    key={division.name}
                    className="relative flex items-center justify-between px-2 py-1.5 transition-all hover:bg-primary/10"
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

      <Card className="overflow-x-auto rounded-lg gap-0 shadow-none">
        <CardHeader className="flex items-center justify-between pt-3 pb-6 border-b">
          <div className="flex flex-1 flex-col justify-center gap-1 pb-3 sm:pb-0">
            <CardTitle>
              Division Sales <span className="text-muted-foreground">({totalDivisions})</span>
            </CardTitle>
            <CardDescription>
              Showing the division sales
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            {view === "chart" &&
              <Select
                value={selectGranularityDivisionSales}
                onValueChange={(val) => setSelectGranularityDivisionSales(val as "monthly" | "quarterly" | "yearly")}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select Granularity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            }

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
          <CardContent className="h-90 min-w-[800px]">
            <ChartContainer
              className="h-full w-full"
              config={{
                Current: { label: "Current", color: "var(--chart-2)" },
                Last: { label: "Last", color: "var(--chart-1)" },
              }}
            >
              <AreaChart
                data={divisionSalesData}
                margin={{ top: 40, right: 20, left: 20, bottom: 50 }}
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
                  fillOpacity={3}
                  activeDot={{ r: 5 }}
                />
                <Area
                  type="step"
                  dataKey="Last"
                  stroke="var(--chart-1)"
                  fill="var(--chart-1)"
                  fillOpacity={3}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        ) : (
          <CardContent className="overflow-x-auto mt-5">
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
            <DataTable data={filteredDivisionSales ?? []} columns={columnsSalesItem} />
          </CardContent>
        )}
      </Card>
    </div>
  );
}
