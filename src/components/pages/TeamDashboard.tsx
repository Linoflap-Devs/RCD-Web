import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
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
} from "../../components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartBar, Table, User } from "lucide-react";
import { useState } from "react";
import DatePickerMonthYear from "../../components/ui/datepicker";
import { Top10SalesPersonsItem, Top10UnitManagersItem } from "@/services/dashboard/dashboard.api";

const chartData = Array.from({ length: 20 }, (_, i) => ({
  developer: `Dev ${i + 1}`,
  sales: Math.floor(Math.random() * 2000 + 500), // random sales for demo
}));

const chartConfig = {
  sales: {
    label: "Monthly Sales",
    color: "#D75C3C",
    icon: User,
  },
} satisfies ChartConfig;

interface TeamSalesProps {
  Top10SalesPersons?: Top10SalesPersonsItem[];
  Top10UnitManagers?: Top10UnitManagersItem[];
}

export function TeamDashboard({
  Top10SalesPersons,
  Top10UnitManagers
}: TeamSalesProps) {
  const [view, setView] = useState("chart");

  const colors = [
    "#D75C3C", "#F28E2B", "#FFBE0B", "#E15759", "#FF9F1C",
    "#76B041", "#FAA43A", "#F4D35E", "#C6AC8F", "#8D99AE"
  ];

  const chartDataSalesPersons =
    (Top10SalesPersons ?? []).map((p, idx) => ({
      name: p.AgentName,
      value: p.CurrentMonth,
      fill: colors[idx % colors.length], // loop if >10
    }));

  const maxIndex = chartDataSalesPersons.reduce(
    (maxIdx, curr, idx, arr) => (curr.value > arr[maxIdx].value ? idx : maxIdx),
    0
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(maxIndex);

  const topManagers =
    (Top10UnitManagers ?? []).map((p, idx) => ({
      name: p.AgentName,
      value: p.CurrentMonth,
      //fill: colors[idx % colors.length], // loop if >10
    }));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 items-stretch">
        <Card className="rounded-lg border shadow-none bg-white gap-3">
          <CardHeader className="flex items-center justify-between gap-2 border-b">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-primary">Top 10 Sales Persons</CardTitle>
              <CardDescription>Monthly Sales</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <DatePickerMonthYear />
            </div>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <div className="flex justify-center mt-4">
              <ChartContainer
                config={{
                  value: {
                    label: "Sales",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-full w-full max-w-sm"
              >
                <PieChart width={300} height={300}>
                  <Pie
                    data={chartDataSalesPersons}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={40}
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
                    {chartDataSalesPersons.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </div>

            {/* List Below */}
            <div className="grid grid-cols-2 gap-3.5 mt-3">
              {chartDataSalesPersons.slice(0, 10).map((dev, index) => (
                <div
                  key={dev.name}
                  className="flex items-center justify-between pb-1 border-b text-sm"
                >
                  <span className="flex items-center font-semibold gap-2 text-gray-700 text-sm">
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
                          className="h-1.5 rounded-full bg-primary"
                          style={{
                            width: `${(manager.value /
                              Math.max(...topManagers.map((m) => m.value))) *
                              100
                              }%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right: Sales */}
                  <span className="text-gray-600 font-medium">
                    {manager.value.toLocaleString()}
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
          <CardContent className="pt-6 pb-0 min-w-[800px]">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-70 w-full"
            >
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />

                {/* X-axis is developer names */}
                <XAxis dataKey="developer" />

                {/* Y-axis is sales */}
                <YAxis />

                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      nameKey="sales"
                      labelFormatter={(value) => `Developer: ${value}`}
                    />
                  }
                />

                <Area
                  type="linear"
                  dataKey="sales"
                  stroke="var(--chart-2)"
                  fill="var(--chart-2)"
                  fillOpacity={0.8}
                  name="Sales"
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
