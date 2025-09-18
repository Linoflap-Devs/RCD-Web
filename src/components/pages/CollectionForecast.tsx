import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  PolarRadiusAxis,
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
} from "../ui/chart";
import DatePickerMonthYear from "../ui/datepicker";

// Chart config
const chartConfig = {
  dpPaid: {
    label: "DP Paid",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const rawDPArray = [120, 80, 95]; // example data
const total = rawDPArray.reduce((sum, val) => sum + val, 0);
const averageDP = Math.round(total / rawDPArray.length); // e.g., 98

const chartDataDP = [
  {
    name: "DP Paid",
    dpPaid: Math.min(averageDP, 100), // bar length capped at 100
    actualDP: averageDP, // label shows real value
    maxDP: 100, // for "/100"
  },
];

interface BuyerData {
  buyer: string;
  value: number;
}

// Mock data
const chartData: BuyerData[] = [
  { buyer: "Buyer A", value: 120000 },
  { buyer: "Buyer B", value: 95000 },
  { buyer: "Buyer C", value: 150000 },
  { buyer: "Buyer D", value: 80000 },
  { buyer: "Buyer E", value: 120000 },
  { buyer: "Buyer F", value: 95000 },
  { buyer: "Buyer G", value: 150000 },
  { buyer: "Buyer H", value: 80000 },
  { buyer: "Buyer A", value: 120000 },
  { buyer: "Buyer B", value: 95000 },
  { buyer: "Buyer C", value: 150000 },
  { buyer: "Buyer D", value: 80000 },
  { buyer: "Buyer E", value: 120000 },
  { buyer: "Buyer F", value: 95000 },
  { buyer: "Buyer G", value: 150000 },
  { buyer: "Buyer H", value: 80000 },
  { buyer: "Buyer A", value: 120000 },
  { buyer: "Buyer B", value: 95000 },
  { buyer: "Buyer C", value: 150000 },
  { buyer: "Buyer D", value: 80000 },
  { buyer: "Buyer E", value: 120000 },
  { buyer: "Buyer F", value: 95000 },
  { buyer: "Buyer G", value: 150000 },
  { buyer: "Buyer H", value: 80000 },
  { buyer: "Buyer A", value: 120000 },
  { buyer: "Buyer B", value: 95000 },
  { buyer: "Buyer C", value: 150000 },
  { buyer: "Buyer D", value: 80000 },
  { buyer: "Buyer E", value: 120000 },
  { buyer: "Buyer F", value: 95000 },
  { buyer: "Buyer G", value: 150000 },
  { buyer: "Buyer H", value: 80000 },
];

const activeChart = "value"; // key in chartData for bar height
const chartConfigForecast = {
  buyerContribution: {
    label: "Buyer Contribution",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function CollectionForecastDashboard() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-stretch">
        {/* Downpayment Summary Card */}
        <Card className="rounded-lg border shadow-none bg-white">
          <CardHeader className="flex items-center gap-2 border-b">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-primary">
                DP (%) Paid Progress
              </CardTitle>
              <CardDescription>
                Average forecasted DP paid.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <ChartContainer config={chartConfig} className="aspect-square h-40">
              <ResponsiveContainer height="100%" width="100%" className="mt-15">
                <RadialBarChart
                  data={chartDataDP}
                  startAngle={180}
                  endAngle={0} // half-circle
                  innerRadius={70}
                  outerRadius={120}
                  barSize={20}
                >
                  <PolarRadiusAxis
                    tick={false}
                    tickLine={false}
                    axisLine={false}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) - 8}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {chartDataDP[0].actualDP}{" "}
                                <tspan className="text-sm font-normal">{`/ ${chartDataDP[0].maxDP}%`}</tspan>
                              </tspan>

                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 20}
                                className="fill-muted-foreground text-sm"
                              >
                                Forecasted DP Paid
                              </tspan>
                            </text>
                          );
                        }
                        return null;
                      }}
                    />
                  </PolarRadiusAxis>

                  <RadialBar
                    dataKey="dpPaid"
                    cornerRadius={10}
                    fill={
                      chartDataDP[0].actualDP > 100
                        ? "#ef4444"
                        : "var(--chart-2)"
                    }
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="col-span-2 rounded-lg border shadow-none bg-white">
          <CardHeader className="flex items-center gap-2 border-b">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-primary">
                Buyer Contribution / Forecast
              </CardTitle>
              <CardDescription>
                Top buyers by forecasted net contracts.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="px-2 sm:p-6 sm:pb-0">
            <ChartContainer
              config={chartConfigForecast}
              className="aspect-auto h-50 w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 16,
                    right: 16,
                    bottom: 16,
                    left: 0,
                  }}
                >
                  <CartesianGrid vertical={false} stroke="#f1f1f1" />
                  <XAxis
                    dataKey="buyer"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={2}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) =>
                      new Intl.NumberFormat("en-US", {
                        notation: "compact",
                        compactDisplay: "short",
                      }).format(value)
                    }
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        nameKey={activeChart}
                        labelFormatter={(value) => value} // buyer name
                        className="w-[160px]"
                      />
                    }
                  />
                  <Bar
                    dataKey={activeChart}
                    fill="var(--chart-4)"
                    radius={[2, 0, 0, 0]} // rounded top corners
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <Card className="rounded-lg border shadow-none bg-white">
        <CardHeader className="flex items-center gap-2 border-b">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-primary">
              Reservation Date vs Net Contract Price
            </CardTitle>
            <CardDescription>
              Forecasted net contracts across reservation dates.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-8"> </CardContent>
      </Card>

      <Card className="rounded-lg border shadow-none bg-white">
        <CardHeader className="mb-3 flex items-center justify-between gap-2 border-b">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-primary">Data Overview</CardTitle>
            <CardDescription>
              Tabular history of all collection forecasts.
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <DatePickerMonthYear />
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-8"> </CardContent>
      </Card>
    </div>
  );
}
