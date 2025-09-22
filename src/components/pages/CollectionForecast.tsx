import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";
import DatePickerMonthYear from "../../components/ui/datepicker";
import { TrendingUp } from "lucide-react";

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

const activeChart = "value";

const chartConfigForecast = {
  buyerContribution: {
    label: "Buyer Contribution",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const forecastMonthlyData = [
  { month: "2025-01", netContractPrice: 10_800_000 }, // Jan
  { month: "2025-02", netContractPrice: 10_520_000 }, // Feb
  { month: "2025-03", netContractPrice: 11_200_000 }, // Mar
  { month: "2025-04", netContractPrice: 12_000_000 }, // Apr
  { month: "2025-05", netContractPrice: 12_800_000 }, // May
  { month: "2025-06", netContractPrice: 13_500_000 }, // Jun
  { month: "2025-07", netContractPrice: 14_200_000 }, // Jul
  { month: "2025-08", netContractPrice: 13_900_000 }, // Aug
  { month: "2025-09", netContractPrice: 14_800_000 }, // Sep
  { month: "2025-10", netContractPrice: 15_600_000 }, // Oct
  { month: "2025-11", netContractPrice: 16_200_000 }, // Nov
  { month: "2025-12", netContractPrice: 17_000_000 }, // Dec
];

export const chartConfigNetForecast = {
  netContractPrice: {
    label: "Net Contract Price",
    color: "#2563eb",
  },
};

export default function CollectionForecastDashboard() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-stretch">
        {/* Downpayment Summary Card */}
        <Card className="rounded-lg border shadow-none bg-white">
          <CardHeader className="flex items-center gap-2 border-b">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-primary">
                DP (%) Paid Progress
              </CardTitle>
              <CardDescription>Average forecasted DP paid.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <ChartContainer config={chartConfig} className="aspect-square h-40">
              <ResponsiveContainer height="100%" width="100%" className="mt-8">
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
          <CardFooter className="flex-col items-start gap-2 text-sm pt-2">
            <div className="flex gap-2 leading-none font-medium">
              {chartDataDP[0].actualDP >= chartDataDP[0].maxDP ? (
                <span className="text-green-600">Target reached!</span>
              ) : (
                <span className="text-yellow-600">Still below target</span>
              )}
            </div>
            <div className="text-muted-foreground leading-none">
              Current progress is {chartDataDP[0].actualDP}% out of {chartDataDP[0].maxDP}% forecasted.
            </div>
          </CardFooter>
        </Card>

        <Card className="col-span-2   rounded-lg border shadow-none bg-white">
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
              <BarChart
                data={chartData}
                margin={{
                  top: 16,
                  right: 10,
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
        <CardContent className="pt-6 pb-0">
          <ChartContainer
            config={chartConfigNetForecast}
            className="aspect-auto h-54 w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastMonthlyData}>
                <CartesianGrid strokeDasharray="3 3" />

                {/* X-axis uses month */}
                <XAxis
                  dataKey="month"
                  tickFormatter={(date) =>
                    new Date(date + "-01").toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })
                  }
                />

                {/* Y-axis formats into millions */}
                <YAxis
                  tickFormatter={(value) =>
                    `₱${(value / 1_000_000).toFixed(1)}M`
                  }
                />

                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      nameKey="netContractPrice"
                      labelFormatter={(value) =>
                        new Date(value + "-01").toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })
                      }
                    />
                  }
                />

                <Legend />

                {/* Line instead of Area */}
                <Line
                  type="monotone"
                  dataKey="netContractPrice"
                  stroke="var(--chart-2)"
                  strokeWidth={2}
                  dot={{ r: 4 }} // visible dots
                  activeDot={{ r: 6 }} // bigger dot on hover
                  name="Net Contract Price"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
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
