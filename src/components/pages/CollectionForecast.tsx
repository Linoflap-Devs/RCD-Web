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
import { CommissionForecastByYearMonthItem, CommissionForecastItem, Top10ForecastBuyersItem } from "@/services/dashboard/dashboard.api";
import { DataTable } from "../ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

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

const activeChart = "value";

const chartConfigForecast = {
  buyerContribution: {
    label: "Buyer Contribution",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export const chartConfigNetForecast = {
  netContractPrice: {
    label: "Net Contract Price",
    color: "#2563eb",
  },
};

export const forecastColumns: ColumnDef<CommissionForecastItem>[] = [
  // {
  //   accessorKey: "rowno",
  //   header: "#",
  //   cell: ({ row }) => row.getValue("rowno") ?? "-",
  // },
  {
    accessorKey: "DeveloperName",
    header: "Developer",
    cell: ({ row }) => row.getValue("DeveloperName") ?? "N/A",
  },
  {
    accessorKey: "BuyersName",
    header: "Buyer’s Name",
    cell: ({ row }) => row.getValue("BuyersName") ?? "N/A",
  },
  // {
  //   accessorKey: "ProjectName",
  //   header: "Project",
  //   cell: ({ row }) => row.getValue("ProjectName") ?? "N/A",
  // },
  // {
  //   accessorKey: "Division",
  //   header: "Division",
  //   cell: ({ row }) => row.getValue("Division") ?? "N/A",
  // },
  {
    accessorKey: "ReservationDate",
    header: "Reservation Date",
    cell: ({ row }) => {
      const date = row.getValue("ReservationDate") as string | null;
      return date ? new Date(date).toLocaleDateString() : "N/A";
    },
  },
  // {
  //   accessorKey: "DownPayment",
  //   header: "Down Payment",
  //   cell: ({ row }) =>
  //     row.getValue("DownPayment")
  //       ? (row.getValue("DownPayment") as number).toLocaleString()
  //       : "0",
  // },
  // {
  //   accessorKey: "DPPaid",
  //   header: "DP Paid",
  //   cell: ({ row }) =>
  //     row.getValue("DPPaid")
  //       ? (row.getValue("DPPaid") as number).toLocaleString()
  //       : "0",
  // },
  // {
  //   accessorKey: "DPPercentPaid",
  //   header: "DP % Paid",
  //   cell: ({ row }) => `${row.getValue("DPPercentPaid") ?? 0}%`,
  // },
  // {
  //   accessorKey: "MonthlyDP",
  //   header: "Monthly DP",
  //   cell: ({ row }) =>
  //     row.getValue("MonthlyDP")
  //       ? (row.getValue("MonthlyDP") as number).toLocaleString()
  //       : "0",
  // },
  {
    accessorKey: "NetTotalTCP",
    header: "Net TCP",
    cell: ({ row }) =>
      row.getValue("NetTotalTCP")
        ? (row.getValue("NetTotalTCP") as number).toLocaleString()
        : "0",
  },
  // {
  //   accessorKey: "PercentRelease",
  //   header: "Release %",
  //   cell: ({ row }) => `${row.getValue("PercentRelease") ?? 0}%`,
  // },
  {
    accessorKey: "ForeCastPercentDPPaid",
    header: "Forecast DP % Paid",
    cell: ({ row }) => `${row.getValue("ForeCastPercentDPPaid") ?? 0}%`,
  },
  // {
  //   accessorKey: "DPStartSchedule",
  //   header: "DP Start",
  //   cell: ({ row }) => {
  //     const date = row.getValue("DPStartSchedule") as string | null;
  //     return date ? new Date(date).toLocaleDateString() : "N/A";
  //   },
  // },
  // {
  //   accessorKey: "EndDP",
  //   header: "DP End",
  //   cell: ({ row }) => {
  //     const date = row.getValue("EndDP") as string | null;
  //     return date ? new Date(date).toLocaleDateString() : "N/A";
  //   },
  // },
];

interface CollectionForecastProps {
  Top10ForecastBuyers?: Top10ForecastBuyersItem[];
  CommissionForecastByYearMonth?: CommissionForecastByYearMonthItem[];
  CommissionForecast?: CommissionForecastItem[];
}

export function CollectionForecastDashboard({
  Top10ForecastBuyers,
  CommissionForecastByYearMonth,
  CommissionForecast
}: CollectionForecastProps) {

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 400);

  const regex = new RegExp(debouncedSearch, "i");

  const filteredForecast = CommissionForecast?.filter((item) => {
    const fullName = item.BuyersName ?? "";
    const rowno = item.rowno?.toString() ?? "";
    const projectName = item.ProjectName ?? "";
    const division = item.Division ?? "";

    return regex.test(fullName) || regex.test(rowno) || regex.test(projectName) || regex.test(division);
  });

  const colors = [
    "#D75C3C", "#F28E2B", "#FFBE0B", "#E15759", "#FF9F1C",
    "#76B041", "#FAA43A", "#F4D35E", "#C6AC8F", "#8D99AE"
  ];

  const chartDataForecastBuyers: BuyerData[] =
    (Top10ForecastBuyers ?? []).map((b, idx) => ({
      buyer: b.BuyersName,
      value: b.NetTotalTCP,
      fill: colors[idx % colors.length],
    }));

  const forecastMonthlyData =
    CommissionForecastByYearMonth?.flatMap((yearData) =>
      yearData.Months.map((m) => {
        // Create a Date from Year + Month (JS months are 0-based)
        const date = new Date(yearData.Year, m.Month - 1, 1);

        return {
          month: `${date.getFullYear()}-${String(m.Month).padStart(2, "0")}`, // "2024-09"
          netContractPrice: m.NetTotalTCP,
          dateObj: date, // keep actual Date object for formatting in chart
        };
      })
    ) ?? [];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-stretch">
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

        <Card className="col-span-2 rounded-lg border shadow-none bg-white">
          <CardHeader className="flex items-center gap-2 border-b">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-primary">
                Top 10 Buyer Contribution / Forecast
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
                data={chartDataForecastBuyers}
                margin={{
                  top: 16,
                  right: 10,
                  bottom: 37,
                  left: 0,
                }}
              >
                <CartesianGrid vertical={false} stroke="#f1f1f1" />
                <XAxis
                  dataKey="buyer"
                  interval={0} // force all labels
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={({ x, y, payload }: any) => (
                    <text
                      x={x}
                      y={y + 10}
                      textAnchor="end"
                      transform={`rotate(-20, ${x}, ${y})`}
                      fontSize={10}
                      fill="#333"
                    >
                      {payload.value}
                    </text>
                  )}
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

                {/* Line */}
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
        <CardHeader className="flex items-center justify-between gap-2 border-b">
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
        <CardContent className="overflow-y-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center gap-3 mt-3 mb-4">
              <div className="relative rounded-lg">
                <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-7 text-xs sm:text-sm h-8 w-90"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DataTable data={filteredForecast ?? []} columns={forecastColumns} />
        </CardContent>
      </Card>
    </div>
  );
}
