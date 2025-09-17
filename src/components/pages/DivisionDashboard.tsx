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
import { ChartContainer } from "../ui/chart";

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
  { name: "Division A", value: 4682, fill: "#1C5D85" },
  { name: "Division B", value: 4123, fill: "#3A82A6" },
  { name: "Division C", value: 3987, fill: "#5CA2C6" },
  { name: "Division D", value: 3750, fill: "#82B8D8" },
  { name: "Division E", value: 3620, fill: "#A0D1E5" },
  { name: "Division F", value: 3485, fill: "#FFB347" },
  { name: "Division G", value: 3350, fill: "#FF7F50" },
  { name: "Division H", value: 3210, fill: "#FF6347" },
  { name: "Division I", value: 3105, fill: "#FF4500" },
  { name: "Division J", value: 2980, fill: "#FF0000" },
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
    currentMonth: monthActual, // if you still want currentMonth/lastMonth
    lastMonth: Math.floor(Math.random() * 5000),
  };
});

export default function DivisionDashboard() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 items-stretch">
        <Card className="col-span-2 rounded-lg border shadow-none bg-white">
          <div className="text-base font-semibold text-primary pl-6">
            Top 10 Divisions
          </div>

          <CardContent className="grid grid-cols-2 gap-8">
            {/* Left Column: ranks 1–5 */}
            <div className="flex flex-col gap-2">
              {topDivisions.slice(0, 5).map((division, index) => {
                const maxSales = topDivisions[0].sales;
                const progressWidth = (division.sales / maxSales) * 100;

                return (
                  <div
                    key={division.name}
                    className="relative flex items-center justify-between px-2 py-1 rounded-lg transition-all hover:bg-primary/10"
                  >
                    {/* Background progress bar */}
                    <div
                      className="absolute left-0 top-0 h-full bg-muted-foreground/10 rounded-l-md"
                      //style={{ width: `${progressWidth}%` }}
                    ></div>

                    <div className="relative z-10 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-xs font-medium flex-shrink-0">
                      {index + 1}
                    </div>

                    <div className="relative z-10 flex-1 px-2 text-xs font-medium text-foreground truncate">
                      {division.name}
                    </div>

                    <div className="relative z-10 text-xs font-semibold text-primary">
                      {division.sales.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: ranks 6–10 */}
            <div className="flex flex-col gap-2">
              {topDivisions.slice(5, 10).map((division, index) => {
                const maxSales = topDivisions[0].sales;
                const progressWidth = (division.sales / maxSales) * 100;

                return (
                  <div
                    key={division.name}
                    className="relative flex items-center justify-between px-2 py-1 rounded-lg transition-all hover:bg-primary/10"
                  >
                    {/* Background progress bar */}
                    <div
                      className="absolute left-0 top-0 h-full bg-muted-foreground/10 rounded-l-md"
                      //style={{ width: `${progressWidth}%` }}
                    ></div>

                    <div className="relative z-10 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-xs font-medium flex-shrink-0">
                      {index + 6}
                    </div>

                    <div className="relative z-10 flex-1 px-2 text-xs font-medium text-foreground truncate">
                      {division.name}
                    </div>

                    <div className="relative z-10 text-xs font-semibold text-primary">
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
                  labelLine={false}
                  outerRadius={70}
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

      <Card className="overflow-x-auto">
        <CardHeader className="gap-1 mb-3">
          <CardTitle className="text-primary">
            Sales Target Division - Monthly
          </CardTitle>
          <CardDescription>Target vs Actual Sales</CardDescription>
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
              data={divisionsData} // divisionsData = [{ division, monthTarget, monthActual, monthTargetReach }]
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

              {/* <Tooltip content={<ChartTooltipContent />} /> */}
              {/* <Legend content={<ChartLegendContent />} /> */}

              {/* Stacked bars */}
              <Bar
                dataKey="monthTarget"
                stackId="a"
                fill="var(--chart-1)"
                radius={[0, 0, 4, 4]}
              />
              <Bar
                dataKey="monthActual"
                stackId="a"
                fill="var(--chart-2)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>



      
    </div>
  );
}
