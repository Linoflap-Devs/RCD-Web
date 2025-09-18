import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
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
} from "../ui/chart";

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
              <CardDescription>Monthly</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex justify-center items-center h-30">
            <ChartContainer
              config={chartConfig}
              className="aspect-square h-45 mt-14"
            >
              <ResponsiveContainer height="90%" width="100%">
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
              <CardDescription>Monthly</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-8">
            {/* a Bar Chart - Interactive wherein - it is to Show which buyers contribute most to the forecasted net contracts. */}
          </CardContent>
        </Card>
      </div>
      <Card className="rounded-lg border shadow-none bg-white">
        <CardHeader className="flex items-center gap-2 border-b">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-primary">
              Reservation Date vs Net Contract Price
            </CardTitle>
            <CardDescription>Monthly</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-8">
          {/* a (Line / Area Chart) - Visualize pipeline over time, how net contract prices are expected to flow across reservation dates. */}
        </CardContent>
      </Card>

      <Card className="rounded-lg border shadow-none bg-white">
        <CardHeader className="flex items-center gap-2 border-b">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-primary">Table Overview</CardTitle>
            <CardDescription>Monthly</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-8"></CardContent>
      </Card>
    </div>
  );
}
