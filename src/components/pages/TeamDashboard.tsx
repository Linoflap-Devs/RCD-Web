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
import { ChartBar, Search, Table, User } from "lucide-react";
import { useEffect, useState } from "react";
import { DeveloperSalesItem } from "@/services/dashboard/dashboard.api";
import { formattedName } from "@/hooks/use-formattedname";
import {
  getTop10SalesPersons,
  Top10SalesPersonItem,
} from "@/services/sales-person/salesperson.api";
import {
  getTop10UnitManagers,
  Top10UnitManagerItem,
} from "@/services/unit-managers/unitmanagers.api";
import { MonthYearPicker } from "../ui/monthyearpicker";
import { Input } from "../ui/input";
import { DataTable } from "../ui/data-table";
import { useDebounce } from "@/hooks/use-debounce";
import { ColumnDef } from "@tanstack/react-table";

const chartConfig = {
  sales: {
    label: "Monthly Sales",
    color: "#D75C3C",
    icon: User,
  },
} satisfies ChartConfig;

interface TeamSalesProps {
  DeveloperSales?: DeveloperSalesItem[];
  Top10SalesPerson?: Top10SalesPersonItem[];
  Top10UnitManager?: Top10UnitManagerItem[];
}

const columnDeveloperSales: ColumnDef<DeveloperSalesItem>[] = [
  {
    accessorKey: "DeveloperName",
    header: () => <div className="text-justify">Developer Name</div>,
    cell: ({ row }) => (
      <div className="text-justify">{row.getValue("DeveloperName")}</div>
    ),
  },
  {
    accessorKey: "NetTotalTCP",
    header: () => <div className="text-justify">Net Total TCP</div>,
    cell: ({ row }) => {
      const rawValue = row.getValue("NetTotalTCP") as number | string | null;

      const formattedValue =
        typeof rawValue === "number"
          ? rawValue.toLocaleString("en-US", { minimumFractionDigits: 2 })
          : rawValue ?? "";

      return <div className="text-justify text-md font-bold">{String(formattedValue)}</div>;
    },
  }
];

export function TeamDashboard({
  DeveloperSales,
  Top10SalesPerson,
  Top10UnitManager,
}: TeamSalesProps) {
  const [view, setView] = useState("chart");
  const [searchTerm, setSearchTerm] = useState("");
  const [salesPersonLoading, setSalesPersonLoading] = useState(false);
  const [salesPersonError, setSalesPersonError] = useState<string | null>(null);
  const [unitManagersLoading, setUnitManagerLoading] = useState(false);
  const [unitManagerError, setUnitManagerError] = useState<string | null>(null);
  const [Top10SalesPersonData, setTop10SalesPersonData] = useState<Top10SalesPersonItem[]>([]);
  const [selectedTop10SalesPersons, setSelectedTop10SalesPersons] = useState<Date | undefined>(new Date());
  const [Top10UnitManagersData, setTop10UnitManagersData] = useState<Top10UnitManagerItem[]>([]);
  const [selectedTop10UnitManagers, setSelectedTop10UnitManagers] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (!selectedTop10SalesPersons) return;

    setSalesPersonLoading(true);
    setSalesPersonError(null);

    const formatted = selectedTop10SalesPersons.toISOString().split("T")[0]; // yyyy-mm-dd

    getTop10SalesPersons(formatted)
      .then((res) => {
        if (res.success) {
          setTop10SalesPersonData(res.data);
        } else {
          console.error(
            "Failed to fetch top 10 salesperson data:",
            res.message
          );
        }
      })
      .catch((err) => {
        console.error("Error fetching top 10 salesperson data:", err);
        setSalesPersonError(err.message || "An error occured.");
      })
      .finally(() => {
        setSalesPersonLoading(false);
      });
  }, [selectedTop10SalesPersons]);

  useEffect(() => {
    if (!selectedTop10UnitManagers) return;

    setUnitManagerLoading(true);
    setUnitManagerError(null);

    const formatted = selectedTop10UnitManagers.toISOString().split("T")[0]; // yyyy-mm-dd

    getTop10UnitManagers(formatted)
      .then((res) => {
        if (res.success) {
          setTop10UnitManagersData(res.data);
        } else {
          console.error(
            "Failed to fetch top 10 unit manager data:",
            res.message
          );
        }
      })
      .catch((err) => {
        console.error("Error fetching top 10 unit manager data:", err);
        setUnitManagerError(err.message || "An error occured.");
      })
      .finally(() => {
        setUnitManagerLoading(false);
      });
  }, [selectedTop10UnitManagers]);

  const colors = [
    "#D75C3C",
    "#F28E2B",
    "#FFBE0B",
    "#E15759",
    "#FF9F1C",
    "#76B041",
    "#FAA43A",
    "#F4D35E",
    "#C6AC8F",
    "#8D99AE",
  ];

  const chartDataSalesPersons =
    ((Top10SalesPersonData?.length ?? 0) > 0
      ? Top10SalesPersonData
      : Top10SalesPerson
    )?.map((p, idx) => ({
      name: p.AgentName,
      value: p.CurrentMonth,
      fill: colors[idx % colors.length],
    })) ?? [];

  const chartDataDeveloperSales = (DeveloperSales ?? [])
    //.slice(0, 10) // limit to first 20
    .map((p, idx) => ({
      developer: p.DeveloperName,
      sales: p.NetTotalTCP,
      fill: colors[idx % colors.length], // loop if >10
    }));

  const maxIndex = chartDataSalesPersons.reduce(
    (maxIdx, curr, idx, arr) => (curr.value > arr[maxIdx].value ? idx : maxIdx),
    0
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(maxIndex);

  const topManagers =
    ((Top10UnitManagersData?.length ?? 0) > 0
      ? Top10UnitManagersData
      : Top10UnitManager
    )?.map((p, idx) => ({
      name: p.AgentName,
      value: p.CurrentMonth,
      fill: colors[idx % colors.length], // optional
    })) ?? [];

  const debouncedSearch = useDebounce(searchTerm, 400);
  const regex = new RegExp(debouncedSearch, "i");

  const filteredDeveloperSales = DeveloperSales?.filter((item) => {
    const developer = item.DeveloperName ?? "";
    const value = item.NetTotalTCP != null ? item.NetTotalTCP.toLocaleString() : "";
    return regex.test(developer) || regex.test(String(value));
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 items-stretch">
        <Card className="rounded-lg border shadow-none bg-white gap-3">
          <CardHeader className="flex items-center justify-between gap-2 py-2 border-b">
            <div className="flex flex-1 flex-col justify-center gap-1 sm:pb-0">
              <CardTitle>Top 10 Sales Persons</CardTitle>
              <CardDescription>Showing the top 10 sales person</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <MonthYearPicker
                value={selectedTop10SalesPersons}
                onChange={setSelectedTop10SalesPersons}
              />
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
                  className="flex items-center justify-between pb-1 text-sm border-b"
                >
                  <span className="flex items-center font-regular gap-2 text-gray-700 text-sm">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: dev.fill }}
                    />
                    {index + 1}. {formattedName(dev.name)}
                  </span>
                  <span className="text-primary font-semibold">
                    {dev.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border shadow-none bg-white">
          <CardHeader className="flex items-center justify-between gap-2 py-3 border-b">
            <div className="flex flex-1 flex-col justify-center gap-1 sm:pb-0">
              <CardTitle>Top 10 Unit Managers</CardTitle>
              <CardDescription>
                Showing the top 10 unit managers
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <MonthYearPicker
                value={selectedTop10UnitManagers}
                onChange={setSelectedTop10UnitManagers}
              />
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
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-full text-xs text-white font-regular"
                      style={{ backgroundColor: manager.fill }} // use the fill color
                    >
                      {index + 1}
                    </span>

                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-gray-700">
                        {formattedName(manager.name)}
                      </span>
                      <div className="h-1 w-64 bg-gray-200 rounded-full mt-1">
                        <div
                          className="h-1.5 rounded-full"
                          style={{
                            width: `${(manager.value /
                                Math.max(...topManagers.map((m) => m.value))) *
                              100
                              }%`,
                            backgroundColor: manager.fill, // optional: match bar with circle
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
          <div className="flex flex-1 flex-col justify-center gap-1 sm:pb-0">
            <CardTitle>
              Developer Sales{" "}
              {/* <span className="text-muted-foreground">(26 out of 40)</span> */}
            </CardTitle>
            <CardDescription>
              Showing the developer sales for the current month.
            </CardDescription>
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
              className="aspect-auto h-90 w-full"
            >
              <AreaChart
                data={chartDataDeveloperSales}
                margin={{ top: 15, right: 20, left: 0, bottom: 70 }}
              >
                <CartesianGrid strokeDasharray="3 3" />

                {/* X-axis is developer names */}
                <XAxis
                  dataKey="developer"
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  tickFormatter={(name) =>
                    name.length > 20 ? name.substring(0, 10) + "…" : name
                  }
                />

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
                  type="basis"
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
          <CardContent className="overflow-x-auto mt-1">
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
            <DataTable data={filteredDeveloperSales ?? []} columns={columnDeveloperSales} />
          </CardContent>
        )}
      </Card>
    </div>
  );
}
