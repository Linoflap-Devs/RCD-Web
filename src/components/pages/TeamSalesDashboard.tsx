import {
  Area,
  AreaChart,
  CartesianGrid,
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

const chartData = Array.from({ length: 26 }, (_, i) => ({
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

export default function TeamSalesDashboard() {
  const [view, setView] = useState("chart");

  return (
    <div className="space-y-5">
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
