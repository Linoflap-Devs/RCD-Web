import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  LabelList,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartBar, Table, User } from "lucide-react";
import { useState } from "react";
import DatePickerMonthYear from "../ui/datepicker";

const chartData = Array.from({ length: 26 }, (_, i) => ({
  developer: `Dev ${i + 1}`,
  sales: Math.floor(Math.random() * 2000 + 500), // random sales for demo
}));

const chartDataDevelopers = [
  { name: "Alice", value: 1200, fill: "#1f77b4" },
  { name: "Bob", value: 980, fill: "#ff7f0e" },
  { name: "Charlie", value: 870, fill: "#2ca02c" },
  { name: "Diana", value: 760, fill: "#d62728" },
  { name: "Ethan", value: 690, fill: "#9467bd" },
  { name: "Fiona", value: 640, fill: "#8c564b" },
  { name: "George", value: 590, fill: "#e377c2" },
  { name: "Hannah", value: 530, fill: "#7f7f7f" },
  { name: "Ian", value: 480, fill: "#bcbd22" },
  { name: "Jane", value: 420, fill: "#17becf" },
];

const chartConfig = {
  sales: {
    label: "Monthly Sales",
    color: "#D75C3C",
    icon: User,
  },
} satisfies ChartConfig;

export default function TeamSalesDashboard() {
  const [view, setView] = useState("chart");

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 items-stretch">
        <Card className="rounded-lg border shadow-none bg-white gap-4">
          <CardHeader className="mb-3 flex items-center justify-between gap-2">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-primary">
                Top 10 Developers Sales
              </CardTitle>
              <CardDescription>Monthly</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <DatePickerMonthYear />
            </div>
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-8">
            {/* Pie Chart */}
            <div className="flex items-center justify-center">
              <ChartContainer
                config={{
                  value: {
                    label: "Sales",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-full w-full flex items-center justify-center"
              >
                <PieChart>
                  <Pie
                    data={chartDataDevelopers}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    labelLine={false}
                  >
                    {chartDataDevelopers.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </div>

            {/* List of Top 10 Developers */}
            <div className="flex flex-col gap-3">
              {chartDataDevelopers.slice(0, 10).map((dev, index) => (
                <div
                  key={dev.name}
                  className="flex items-center justify-between border-b pb-1 text-sm"
                >
                  <span className="flex items-center gap-2 font-medium text-gray-700">
                    {/* color dot to match pie slice */}
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: dev.fill }}
                    />
                    {index + 1}. {dev.name}
                  </span>
                  <span className="text-gray-600">{dev.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>

        </Card>

        <Card className="rounded-lg border shadow-none bg-white">
          <CardHeader className="mb-3 flex items-center justify-between gap-2">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-primary">
                Top 10 Unit Managers
              </CardTitle>
              <CardDescription>Monthly</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <DatePickerMonthYear />
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-2"></div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-lg shadow-none">
        <CardHeader className="mb-3 flex items-center justify-between gap-2">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-primary">
              Developer Sales{" "}
              <span className="text-muted-foreground">(30 out of 60)</span>
            </CardTitle>
            <CardDescription>Monthly Sales by Developer</CardDescription>
          </div>
          <div className="flex items-center gap-2">
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

        {view === "chart" ? (
          <CardContent className="h-[280px] w-full">
            <div className="w-full h-full overflow-x-auto">
              <ChartContainer
                config={chartConfig}
                className="aspect-auto h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="developer"
                      interval={0}
                      tickLine={false}
                      axisLine={false}
                      tickMargin={10}
                      angle={-45}
                      textAnchor="end"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis tickLine={false} axisLine={false} />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                    />
                    <Area
                      type="step"
                      dataKey="sales"
                      stroke={chartConfig.sales.color}
                      fill={chartConfig.sales.color}
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
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
