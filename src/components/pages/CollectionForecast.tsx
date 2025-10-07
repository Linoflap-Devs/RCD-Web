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
import {
  CommissionForecastByYearMonthItem,
  DownpaymentPercentItem,
  Top10ForecastBuyersItem,
} from "@/services/dashboard/dashboard.api";
import { DataTable } from "../ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import {
  ComissionForecastsItem,
  getCollectionForecast,
} from "@/services/commissions-forecast/commissionsforecast.api";
import { MonthYearPicker } from "../ui/monthyearpicker";

interface BuyerData {
  buyer: string;
  value: number;
}

const chartConfig = {
  dpPaid: {
    label: "DP Paid",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const activeChart = "value";

const chartConfigForecast = {
  buyerContribution: {
    label: "Buyer Contribution",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const chartConfigNetForecast = {
  netContractPrice: {
    label: "Net Contract Price",
    color: "#2563eb",
  },
};

export const forecastColumns: ColumnDef<ComissionForecastsItem>[] = [
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
    cell: ({ row }) => {
      const buyersName = row.getValue("BuyersName") as String;

      return <div className="font-semibold">{buyersName}</div>;
    },
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
  {
    accessorKey: "DPPercentPaid",
    header: "DP % Paid",
    cell: ({ row }) => `${row.getValue("DPPercentPaid") ?? 0}%`,
  },
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
  {
    accessorKey: "PercentRelease",
    header: "Release %",
    cell: ({ row }) => `${row.getValue("PercentRelease") ?? 0}%`,
  },
  {
    accessorKey: "ForeCastPercentDPPaid",
    header: "Forecast DP % Paid",
    cell: ({ row }) => `${row.getValue("ForeCastPercentDPPaid") ?? 0}%`,
  },
  {
    accessorKey: "DPStartSchedule",
    header: "DP Start",
    cell: ({ row }) => {
      const date = row.getValue("DPStartSchedule") as string | null;
      return date ? new Date(date).toLocaleDateString() : "N/A";
    },
  },
  {
    accessorKey: "EndDP",
    header: "DP End",
    cell: ({ row }) => {
      const date = row.getValue("EndDP") as string | null;
      return date ? new Date(date).toLocaleDateString() : "N/A";
    },
  },
];

interface CollectionForecastProps {
  Top10ForecastBuyers?: Top10ForecastBuyersItem[];
  CommissionForecastByYearMonth?: CommissionForecastByYearMonthItem[];
  CommissionForecast?: ComissionForecastsItem[];
  DownpaymentPercent?: DownpaymentPercentItem;
}

export function CollectionForecastDashboard({
  Top10ForecastBuyers,
  CommissionForecastByYearMonth,
  CommissionForecast,
  DownpaymentPercent,
}: CollectionForecastProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 400);
  const [commissionsForecastLoading, setCommissionsForecastLoading] =
    useState(false);
  const [commissionsForecastError, setCommissionsForecastError] =
    useState(null);
  const [commissionsforecastData, setCommissionsForecastData] = useState<
    ComissionForecastsItem[]
  >([]);
  const [selectedCommissionForecast, setSelectedCommissionForecast] = useState<
    Date | undefined
  >(new Date());

  useEffect(() => {
    if (!selectedCommissionForecast) return;

    setCommissionsForecastLoading(true);
    setCommissionsForecastError(null);

    const formatted = selectedCommissionForecast.toISOString().split("T")[0]; // yyyy-mm-dd

    getCollectionForecast(formatted)
      .then((res) => {
        if (res.success) {
          setCommissionsForecastData(res.data);
        } else {
          console.error(
            "Failed to fetch top 10 unit manager data:",
            res.message
          );
        }
      })
      .catch((err) => {
        console.error("Error fetching top 10 unit manager data:", err);
        setCommissionsForecastError(err.message || "An error occured.");
      })
      .finally(() => {
        setCommissionsForecastLoading(false);
      });
  }, [selectedCommissionForecast]);

  const regex = new RegExp(debouncedSearch, "i");

  const filteredForecast =
    ((commissionsforecastData?.length ?? 0) > 0
      ? commissionsforecastData
      : CommissionForecast
    )?.filter((item) => {
      const fullName = item.BuyersName ?? "";
      const rowno = item.rowno?.toString() ?? "";
      const projectName = item.ProjectName ?? "";
      const division = item.Division ?? "";

      return (
        regex.test(fullName) ||
        regex.test(rowno) ||
        regex.test(projectName) ||
        regex.test(division)
      );
    }) ?? [];

  const colors = ["#F8BB21"];

  const chartDataForecastBuyers: BuyerData[] = (Top10ForecastBuyers ?? []).map(
    (b, idx) => ({
      buyer: b.BuyersName,
      value: b.NetTotalTCP,
      fill: colors[idx % colors.length],
    })
  );

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

  const chartDataDP = [
    {
      name: "DP Paid",
      dpPaid: DownpaymentPercent?.TotalPaidPercent ?? 0, // cap bar
      actualDP: DownpaymentPercent?.TotalPaid ?? 0, // for labels/tooltip
      maxDP: DownpaymentPercent?.TotalForecast ?? 0,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-stretch">
        <Card className="rounded-lg border shadow-none bg-white">
          <CardHeader className="flex items-center justify-between pt-3 pb-6 border-b">
            <div className="flex flex-1 flex-col justify-center gap-1 sm:pb-0">
              <CardTitle>DP Paid Progress</CardTitle>
              <CardDescription>
                Showing the average forecasted DP paid
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <ChartContainer config={chartConfig} className="aspect-square h-50">
              <RadialBarChart
                data={chartDataDP}
                startAngle={180}
                endAngle={0}
                innerRadius="60%"
                outerRadius="100%"
                barSize={35}
              >
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        const formatAmount = (num: number) =>
                          (num / 1_000_000).toFixed(2) + "M";

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
                              className="fill-foreground text-lg font-bold"
                            >
                              {chartDataDP[0].dpPaid.toFixed(2)}%
                            </tspan>

                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 20}
                              className="fill-muted-foreground text-sm"
                            >
                              {`${formatAmount(
                                chartDataDP[0].actualDP
                              )} / ${formatAmount(chartDataDP[0].maxDP)}`}
                            </tspan>

                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 40}
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
                    chartDataDP[0].dpPaid > 100 ? "#ef4444" : "var(--chart-2)"
                  }
                />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm pt-2">
            <div className="flex gap-2 leading-none font-medium">
              {chartDataDP[0].dpPaid >= 100 ? (
                <span className="text-green-600">Target reached!</span>
              ) : (
                <span className="text-yellow-600">Still below target.</span>
              )}
            </div>
            <div className="text-muted-foreground leading-none">
              Current progress is{" "}
              <span className="font-semibold">
                {chartDataDP[0].dpPaid.toFixed(2)}%
              </span>{" "}
              ({(chartDataDP[0].actualDP / 1_000_000).toFixed(2)}M) out of{" "}
              <span className="font-semibold">
                {(chartDataDP[0].maxDP / 1_000_000).toFixed(2)}M
              </span>{" "}
              forecasted.
            </div>
          </CardFooter>
        </Card>

        <Card className="col-span-2 rounded-lg border shadow-none bg-white">
          <CardHeader className="flex items-center justify-between pt-3 pb-6 border-b">
            <div className="flex flex-1 flex-col justify-center gap-1 sm:pb-0">
              <CardTitle>Top 10 Buyer Contribution / Forecast</CardTitle>
              <CardDescription>
                Showing the top buyers by forecasted net contracts
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="px-2 sm:p-6 sm:pb-0">
            <ChartContainer
              config={chartConfigForecast}
              className="aspect-auto h-65 w-full"
            >
              <BarChart
                data={chartDataForecastBuyers}
                margin={{
                  top: 20,
                  right: 10,
                  bottom: 35,
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

      <Card className="overflow-x-auto rounded-lg gap-0 shadow-none">
        <CardHeader className="flex items-center justify-between pt-3 pb-6 border-b">
          <div className="flex flex-1 flex-col justify-center gap-1 sm:pb-0">
            <CardTitle>Reservation Date and Net Contract Price</CardTitle>
            <CardDescription>
              Showing the the forecasted net contracts across reservation dates.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <MonthYearPicker
              value={selectedCommissionForecast}
              onChange={setSelectedCommissionForecast}
            />
          </div>
        </CardHeader>
        <CardContent className="pt-6 pb-0">
          <ChartContainer
            config={chartConfigNetForecast}
            className="aspect-auto h-70 w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastMonthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
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

      <Card className="overflow-x-auto rounded-lg gap-0 shadow-none">
        <CardHeader className="flex items-center justify-between pt-3 pb-6 border-b">
          <div className="flex flex-1 flex-col justify-center gap-1 pb-3">
            <CardTitle>Data Collection Forecast Overview</CardTitle>
            <CardDescription>
              Showing the tabular history of all collection forecasts
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <MonthYearPicker
              value={selectedCommissionForecast}
              onChange={setSelectedCommissionForecast}
            />
          </div>
        </CardHeader>
        <CardContent className="overflow-y-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center gap-3 mt-8 mb-4">
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
