import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  SectorProps,
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
  { name: "Alice", value: 1200, fill: "#D75C3C" }, // deep burnt orange
  { name: "Bob", value: 980, fill: "#F28E2B" }, // rich orange
  { name: "Charlie", value: 870, fill: "#FFBE0B" }, // golden yellow-orange
  { name: "Diana", value: 760, fill: "#E15759" }, // red-orange
  { name: "Ethan", value: 690, fill: "#FF9F1C" }, // bright orange
  { name: "Fiona", value: 640, fill: "#76B041" }, // warm green (for contrast)
  { name: "George", value: 590, fill: "#FAA43A" }, // lighter orange
  { name: "Hannah", value: 530, fill: "#F4D35E" }, // muted yellow
  { name: "Ian", value: 480, fill: "#C6AC8F" }, // earthy beige/tan
  { name: "Jane", value: 420, fill: "#8D99AE" }, // neutral gray-blue accent
];

const topManagers = [
  { name: "Alice", sales: 1200 },
  { name: "Bob", sales: 1100 },
  { name: "Charlie", sales: 980 },
  { name: "Diana", sales: 950 },
  { name: "Ethan", sales: 900 },
  { name: "Fiona", sales: 870 },
  { name: "George", sales: 850 },
  { name: "Hannah", sales: 800 },
  { name: "Ian", sales: 780 },
  { name: "Jane", sales: 750 },
];

const chartConfig = {
  sales: {
    label: "Monthly Sales",
    color: "#D75C3C",
    icon: User,
  },
} satisfies ChartConfig;

export default function TeamDashboard() {
  const [view, setView] = useState("chart");
  const maxIndex = chartDataDevelopers.reduce(
    (maxIdx, curr, idx, arr) => (curr.value > arr[maxIdx].value ? idx : maxIdx),
    0
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(maxIndex);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 items-stretch">
        <Card className="rounded-lg border shadow-none bg-white gap-3">
          <CardHeader className="flex items-center justify-between gap-2 border-b">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-primary">Top 10 Developers</CardTitle>
              <CardDescription>Monthly Sales</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <DatePickerMonthYear />
            </div>
          </CardHeader>

          <CardContent className="flex flex-col gap-3">
            <div className="flex justify-center">
              <ChartContainer
                config={{
                  value: {
                    label: "Sales",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[250px] w-full max-w-sm"
              >
                <PieChart width={320} height={320}>
                  <Pie
                    data={chartDataDevelopers}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    labelLine={false}
                    label
                    activeIndex={activeIndex ?? undefined}
                    activeShape={(props: SectorProps) => (
                      <Sector
                        {...props}
                        outerRadius={(props.outerRadius ?? 0) + 10}
                      />
                    )}
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(maxIndex)} // reset to highest
                  >
                    {chartDataDevelopers.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </div>

            {/* List Below */}
            <div className="grid grid-cols-2 gap-3">
              {chartDataDevelopers.slice(0, 10).map((dev, index) => (
                <div
                  key={dev.name}
                  className="flex items-center justify-between pb-1 border-b text-sm"
                >
                  <span className="flex items-center gap-2 font-medium text-gray-700">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: dev.fill }}
                    />
                    {index + 1}. {dev.name}
                  </span>
                  <span className="text-gray-600">
                    {dev.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border shadow-none bg-white">
          <CardHeader className="flex items-center justify-between gap-2 border-b">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-primary">
                Top 10 Unit Managers
              </CardTitle>
              <CardDescription>Monthly Sales</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <DatePickerMonthYear />
            </div>
          </CardHeader>

          <CardContent className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-3">
              {topManagers.map((manager, index) => (
                <div
                  key={manager.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold">
                      {index + 1}
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-sm text-gray-700">
                        {manager.name}
                      </span>
                      <div className="h-1 w-64 bg-gray-200 rounded-full mt-1">
                        <div
                          className="h-1 rounded-full bg-primary"
                          style={{
                            width: `${
                              (manager.sales /
                                Math.max(...topManagers.map((m) => m.sales))) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right: Sales */}
                  <span className="text-gray-600 font-medium">
                    {manager.sales.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-x-auto rounded-lg shadow-none">
        <CardHeader className="flex items-center justify-between gap-2 border-b">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-primary">
              Developer Sales{" "}
              <span className="text-muted-foreground">(26 out of 40)</span>
            </CardTitle>
            <CardDescription>Monthly Sales Comparison</CardDescription>
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

        <CardContent className="h-64 max-w-[1180px]">
          {view === "chart" ? (
            <ChartContainer config={chartConfig} className="aspect-auto h-full">
              <ResponsiveContainer height="100%" width="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 20, right: 10, left: 20, bottom: 20 }}
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
                  />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip
                    cursor={false}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-md bg-white p-3 shadow-md">
                            <p className="flex items-center justify-between gap-8 text-sm font-medium text-gray-800">
                              <span>{data.developer}</span>
                              <span className="ml-6">
                                {data.sales.toLocaleString()}
                              </span>
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke={chartConfig.sales.color}
                    fill={chartConfig.sales.color}
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
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
