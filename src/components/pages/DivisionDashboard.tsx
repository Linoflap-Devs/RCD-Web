import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
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

const topDivisions = [
  { name: "Black Diamond", sales: 1200, fill: "#D75C3C" }, // deep burnt orange
  { name: "Golden Heart", sales: 980, fill: "#F28E2B" }, // rich orange
  { name: "Jade", sales: 870, fill: "#FFBE0B" }, // golden yellow-orange
  { name: "Dream Builder", sales: 760, fill: "#E15759" }, // red-orange
  { name: "Alpha", sales: 690, fill: "#FF9F1C" }, // bright orange
  { name: "Summit", sales: 640, fill: "#76B041" }, // warm green (for contrast)
  { name: "Rose", sales: 590, fill: "#FAA43A" }, // lighter orange
  { name: "Alexanderite", sales: 530, fill: "#F4D35E" }, // muted yellow
  { name: "England", sales: 480, fill: "#C6AC8F" }, // earthy beige/tan
  { name: "Via Domus", sales: 420, fill: "#8D99AE" }, // neutral gray-blue accent
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
    color: "var(--chart-1)", // primary color for the bar
  },
} satisfies ChartConfig;

export default function DivisionDashboard() {
  const [view, setView] = useState("chart");

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 items-stretch">
        <Card className="col-span-2 rounded-lg border shadow-none bg-white">
          <CardHeader className="mb-3 flex items-center justify-between gap-2">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-primary">
                Top 10 Division Sales
              </CardTitle>
              <CardDescription>Monthly</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <DatePickerMonthYear />
            </div>
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-1">
              {topDivisions.slice(0, 5).map((division, index) => {
                const maxSales = topDivisions[0].sales;
                const progressWidth = (division.sales / maxSales) * 100;

                return (
                  <div
                    key={division.name}
                    className="relative flex items-center justify-between px-2 py-1 rounded-lg transition-all hover:bg-primary/10"
                  >
                    {/* <div
                      className="absolute left-0 top-0 h-full bg-muted-foreground/10 rounded-l-md"
                      style={{ width: `${progressWidth}%` }}
                    ></div> */}

                    <div style={{ backgroundColor: division.fill }} className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-medium flex-shrink-0">
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

            <div className="flex flex-col gap-1">
              {topDivisions.slice(5, 10).map((division, index) => {
                const maxSales = topDivisions[0].sales;
                const progressWidth = (division.sales / maxSales) * 100;

                return (
                  <div
                    key={division.name}
                    className="relative flex items-center justify-between px-2 py-1 rounded-lg transition-all hover:bg-primary/10"
                  >
                    {/* <div
                      className="absolute left-0 top-0 h-full bg-muted-foreground/10 rounded-l-md"
                      style={{ width: `${progressWidth}%` }}
                    ></div> */}

                    <div style={{ backgroundColor: division.fill }} className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-medium flex-shrink-0">
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

        <Card className="rounded-lg border-none shadow-none bg-white">
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="w-full h-64">
              <ResponsiveContainer height="100%" width="100%">
                <BarChart
                  accessibilityLayer
                  data={topDivisions}
                  layout="vertical"
                  margin={{
                    right: 2,
                  }}
                  barCategoryGap="10%"
                >
                  <CartesianGrid horizontal={false} />
                  <YAxis
                    dataKey="month"
                    type="category"
                    tickLine={true}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                  />
                  <XAxis dataKey="sales" type="number" hide />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Bar
                    dataKey="sales"
                    layout="vertical"
                    fill="#fff"
                    radius={4}
                  >
                    <LabelList
                      dataKey="name"
                      position="insideLeft"
                      offset={8}
                      className="fill-(--color-label)"
                      fontSize={12}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card> 
      </div>

      <Card className="overflow-x-auto rounded-lg shadow-none">
        <CardHeader className="gap-1 mb-3">
          <CardTitle className="text-primary">Sales Target Division</CardTitle>
          <CardDescription>Monthly Target - Actual Sales</CardDescription>
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
                          className="w-3 h-3 block rounded-sm"
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
                          className="w-3 h-3 block rounded-sm"
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
                        <span className="w-3 h-3 block rounded-sm bg-green-500"></span>
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

      <Card className="overflow-x-auto rounded-lg shadow-none">
        <CardHeader className="mb-3 flex items-center justify-between gap-2">
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
                className={`flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  view === "chart"
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted-foreground hover:bg-gray-50"
                }`}
                onClick={() => setView("chart")}
              >
                <ChartBar className="w-3 h-3" />
              </button>
              <button
                className={`flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  view === "table"
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

        <CardContent className="h-64 min-w-[800px]">
          {view === "chart" ? (
            <ChartContainer
              className="h-full w-full"
              config={{
                target: { label: "Current Month", color: "var(--chart-1)" },
                actual: { label: "Current Year", color: "var(--chart-2)" },
              }}
            >
              <BarChart
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

                <Bar
                  dataKey="Current"
                  stackId="a"
                  fill="var(--chart-1)"
                  radius={[4, 4, 4, 4]}
                />
                <Bar
                  dataKey="Last"
                  stackId="a"
                  fill="var(--chart-2)"
                  radius={[4, 4, 4, 4]}
                />
              </BarChart>
            </ChartContainer>
          ) : (
            <CardContent className="overflow-x-auto">
              {/* Table component */}
            </CardContent>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
