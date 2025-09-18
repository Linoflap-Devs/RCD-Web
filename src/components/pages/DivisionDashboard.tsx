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
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "../ui/chart";
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
  { name: "Division A", sales: 4682 },
  { name: "Division B", sales: 4123 },
  { name: "Division C", sales: 3987 },
  { name: "Division D", sales: 3750 },
  { name: "Division E", sales: 3620 },
  { name: "Division F", sales: 3485 },
  { name: "Division G", sales: 3350 },
  { name: "Division H", sales: 3210 },
  { name: "Division I", sales: 3105 },
  { name: "Division J", sales: 2980 },
];

const chartData = [
  { name: "Division A", value: 4682, fill: "#FFE5B4" }, // light peach
  { name: "Division B", value: 4123, fill: "#FFD89B" }, // soft apricot
  { name: "Division C", value: 3987, fill: "#FFC97B" }, // warm orange
  { name: "Division D", value: 3750, fill: "#FFB84D" }, // mango orange
  { name: "Division E", value: 3620, fill: "#FFA733" }, // pumpkin
  { name: "Division F", value: 3485, fill: "#FF8C1A" }, // tangerine
  { name: "Division G", value: 3350, fill: "#FF751A" }, // burnt orange
  { name: "Division H", value: 3210, fill: "#FF5C1A" }, // sunset orange
  { name: "Division I", value: 3105, fill: "#FF471A" }, // reddish-orange
  { name: "Division J", value: 2980, fill: "#E63900" }, // deep vermilion
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
            <div className="flex flex-col gap-2">
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

                    <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-medium flex-shrink-0">
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

            <div className="flex flex-col gap-2">
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

                    <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-medium flex-shrink-0">
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

        <Card className="rounded-lg border-none shadow-none flex flex-col justify-center bg-white">
          <CardContent className="flex-1 pb-0 h-21">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  label
                  //labelLine={false}
                  outerRadius={80}
                  //innerRadius={40}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "0.5rem",
                    padding: "0.1rem",
                    color: "#1C5D85",
                    fontWeight: 500,
                  }}
                  formatter={(value: number) => value.toLocaleString()}
                />
              </PieChart>
            </ResponsiveContainer>
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
