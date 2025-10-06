"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "../../components/ui/button";
import {
  ChevronsUpDown,
  Filter,
  InfoIcon,
  Loader,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { AgentsItem, getAgents } from "@/services/agents/agents.api";
import { useDebounce } from "@/hooks/use-debounce";

const agentColumns: ColumnDef<AgentsItem>[] = [
  // {
  //   accessorKey: "AgentID",
  //   header: ({ column }) => (
  //     <Button
  //       variant="ghost"
  //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //     >
  //       ID
  //       <ChevronsUpDown className="ml-1 h-4 w-4" />
  //     </Button>
  //   ),
  //   cell: ({ row }) => <div className="text-sm">{row.getValue("AgentID")}</div>,
  // },
  {
    accessorKey: "AgentCode",
    header: "Agent Code",
    cell: ({ row }) => <div className="text-xs">{row.getValue("AgentCode")}</div>,
  },
  {
    accessorFn: (row) => `${row.FirstName} ${row.MiddleName || ""} ${row.LastName}`,
    id: "FullName",
    header: "Agent Name",
    cell: ({ row }) => {
      const fullName = row.getValue("FullName") as string;
      const firstLetter = fullName.charAt(0).toUpperCase();
      const gender = row.original.Sex;

      const bgColor =
        gender === "Male"
          ? "bg-blue-200"
          : gender === "Female"
            ? "bg-red-200"
            : "bg-gray-200";

      return (
        <div className="flex items-center space-x-2">
          <div className={`w-6 h-6 rounded-full ${bgColor} flex items-center justify-center text-gray-600 text-xs font-medium`}>
            {firstLetter}
          </div>
          <div className="text-xs font-semibold ml-1">{fullName.toLocaleUpperCase()}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "DivisionID",
    header: "Division",
    cell: ({ row }) => row.getValue("DivisionID") ?? "N/A",
  },
  {
    accessorKey: "Birthdate",
    header: "Birthdate",
    cell: ({ row }) => {
      const birthdate = row.getValue("Birthdate") as string;
      return birthdate ? new Date(birthdate).toLocaleDateString() : "N/A";
    },
  },
  {
    accessorKey: "AgentTaxRate",
    header: "Agent Tax Rate",
    cell: ({ row }) => row.getValue("AgentTaxRate") ?? "N/A",
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const agent = row.original;

      return (
        <div className="text-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-4 w-4 p-0 sm:h-4 sm:w-4">
                <span className="sr-only">Open menu</span>
                {/* Smaller icon */}
                <MoreHorizontal className="h-1.5 w-1.5 sm:h-2 sm:w-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-xs sm:text-sm">
              <DropdownMenuItem asChild className="text-xs sm:text-sm">
                {/* <Link href={`/home/crew/details?id=${crew.CrewCode}`}>
                  <IdCard className="mr-1.5 sm:mr-2 h-3.5 sm:h-4 w-3.5 sm:w-4" />
                  View Crew Details
                </Link> */}
              </DropdownMenuItem>
              {/* <DropdownMenuSeparator /> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export default function AgentsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [agents, setAgents] = useState<AgentsItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const debouncedSearch = useDebounce(searchTerm, 400);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        const res = await getAgents();
        setAgents(res.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch agents");
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);
  
  const regex = new RegExp(debouncedSearch, "i");

  const filteredAgents = agents.filter((agent) => {
    const fullName = `${agent.FirstName} ${agent.MiddleName || ""} ${agent.LastName}`;
    return (
      regex.test(fullName) ||
      regex.test(agent.AgentCode.toString())
    );
  });

  if (error) return <p>Error: {error}</p>

  return (
    <>
      <div className="h-full w-full overflow-hidden">
        <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }

        /* Hide scrollbar for all scrollable elements in the component */
        .overflow-y-auto::-webkit-scrollbar,
        .overflow-auto::-webkit-scrollbar,
        .overflow-scroll::-webkit-scrollbar {
          display: none;
        }

        .overflow-y-auto,
        .overflow-auto,
        .overflow-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        <div className="h-full overflow-hidden">
          <div className="p-2 sm:py-0 flex flex-col space-y-4 sm:space-y-4 h-full">
            <div className="flex flex-col space-y-5 sm:space-y-5 min-h-full">
              <div className="space-y-0.5">
                <h2 className="text-2xl font-semibold tracking-tight">Agents</h2>
                <p className="text-sm text-muted-foreground">
                  List of all agents
                </p>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex flex-col md:flex-row items-center gap-3">
                  <div className="bg-white relative rounded-lg w-64 sm:w-80">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search..."
                      className="pl-10 text-sm sm:text-base h-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                {/* <div>
                  <Select>
                    <SelectTrigger className="h-8 px-3 sm:px-4 text-xs sm:text-sm flex items-center gap-2">
                      <Filter className="h-4 w-4 text-primary" />
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All agents</SelectItem>
                      <SelectItem value="verified">Active</SelectItem>
                      <SelectItem value="pending">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
              </div>
              {loading ? (
                <div className="flex justify-center items-center h-40 gap-2 text-muted-foreground">
                  <Loader className="h-5 w-5 animate-spin" />
                  <p className="text-sm">Loading agents data...</p>
                </div>
              // ) : filteredAgents.length === 0 ? (
              //   <div className="flex justify-center items-center h-40">
              //     <p className="text-muted-foreground">No results found.</p>
              //   </div>
              ) : (
                <div className="rounded-md pb-3">
                  <DataTable columns={agentColumns} pageSize={10} data={filteredAgents} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
