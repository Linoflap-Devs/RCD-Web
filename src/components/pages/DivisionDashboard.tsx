import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
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
} from "../ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { ChartBar, Table } from "lucide-react";
import DatePickerMonthYear from "../ui/datepicker";
import Image from "next/image";

const topDivisions = [
  { name: "Black Diamond", sales: 1200, fill: "#D75C3C" }, // deep burnt orange
  { name: "Golden Heart", sales: 980, fill: "#F28E2B" }, // rich orange
  { name: "Jade", sales: 870, fill: "#FFBE0B" }, // golden yellow-orange
  { name: "Dream Builder", sales: 760, fill: "#E15759" }, // red-orange
  { name: "Alpha", sales: 690, fill: "#FF9F1C" }, // bright orange
  { name: "Summit", sales: 6240, fill: "#76B041" }, // warm green (for contrast)
  { name: "Rose", sales: 590, fill: "#FAA43A" }, // lighter orange
  { name: "Alexanderite", sales: 530, fill: "#F4D35E" }, // muted yellow
  { name: "England", sales: 480, fill: "#C6AC8F" }, // earthy beige/tan
  { name: "Via Domus", sales: 1900, fill: "#8D99AE" }, // neutral gray-blue accent
];

const divisionsData = Array.from({ length: 30 }, (_, i) => {
  const monthTarget = Math.floor(Math.random() * 5000) + 2000; // Target between 2000-7000
  const monthActual = Math.floor(Math.random() * monthTarget); // Actual <= Target
  const monthTargetReach = Math.round((monthActual / monthTarget) * 100); // % Reach

  return {
    division: `Division ${i + 1}`,
    monthTarget,
    monthActual,
    monthTargetReach,
    currentMonth: monthActual,
    lastMonth: Math.floor(Math.random() * 5000),
  };
});

const divisionsSalesData = Array.from({ length: 30 }, (_, i) => {
  const Current = Math.floor(Math.random() * 5000);
  const Last = Math.floor(Math.random() * 5000);
  return {
    division: `Division ${i + 1}`,
    Current,
    Last,
  };
});

// chartConfig.ts
export const chartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function DivisionDashboard() {
  const [view, setView] = useState("chart");
  const sortedDivisions = [...topDivisions].sort((a, b) => b.sales - a.sales);

  return (
    <div className="space-y-4">
      <Card className="overflow-x-auto rounded-lg shadow-none">
        <CardHeader className="mb-3 items-center gap-2 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="col-span-2 relative z-30 flex flex-col px-6 justify-center text-left border rounded-lg">
              <div className="flex divide-x divide-gray-300">
                <div className="flex-1 flex flex-col gap-0.3">
                  <span className="text-muted-foreground text-xs block">Total Sales Target Division</span>
                  <span className="text-lg font-bold sm:text-2xl">89%</span>
                </div>
                <div className="flex-1 pl-4 flex flex-col gap-0.3">
                  <span className="text-muted-foreground text-xs block">Total Actual</span>
                  <span className="text-lg font-bold sm:text-2xl">120%</span>
                </div>
              </div>
            </div>
            <div className="bg-[#76B041] rounded-lg p-4 flex-1 pl-4 flex flex-col gap-0.3">
              <span className="text-white text-xs block">Total Reach</span>
              <span className="text-white text-base font-bold sm:text-2xl">120%</span>
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
              margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-stretch">
        <Card className="col-span-4 rounded-lg border shadow-none bg-white">
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
        <CardHeader className="mb-3 flex items-center justify-between gap-2 border-b">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-primary">
              Division Sales <span className="text-muted-foreground">(30)</span>
            </CardTitle>
            <CardDescription>Monthly Sales Comparison</CardDescription>
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
          <CardContent className="h-64 min-w-[800px]">
            <ChartContainer
              className="h-full w-full"
              config={{
                target: { label: "Current Month", color: "var(--chart-1)" },
                actual: { label: "Current Year", color: "var(--chart-2)" },
              }}
            >
              <AreaChart
                data={divisionsSalesData}
                margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
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
                  type="natural"
                  dataKey="Current"
                  stroke="var(--chart-2)"
                  fill="var(--chart-2)"
                  fillOpacity={0.7}
                  activeDot={{ r: 5 }}
                />
                <Area
                  type="natural"
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
            {/* Table component */}
          </CardContent>
        )}
      </Card>
    </div>
  );
}
