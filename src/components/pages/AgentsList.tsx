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
import { Badge } from "../ui/badge";

const agentColumns: ColumnDef<AgentsItem>[] = [
  {
    accessorKey: "AgentID",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        <ChevronsUpDown className="ml-1 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-sm">{row.getValue("AgentID")}</div>,
  },
  {
    accessorKey: "AgentCode",
    header: "Code",
    cell: ({ row }) => <div className="text-sm">{row.getValue("AgentCode")}</div>,
  },
  {
    accessorFn: (row) => `${row.FirstName} ${row.MiddleName || ""} ${row.LastName}`,
    id: "FullName",
    header: "Agent Name",
    cell: ({ row }) => <div className="text-sm">{row.getValue("FullName")}</div>,
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
];

export default function AgentsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [agents, setAgents] = useState<AgentsItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const debouncedSearch = useDebounce(searchTerm, 400); // delay before filtering

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

  //console.log(agents);

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
          <div className="p-2 sm:py-0 flex flex-col space-y-4 sm:space-y-6 h-full">
            <div className="flex flex-col space-y-5 sm:space-y-3.5 min-h-full">
              <div className="space-y-0.5">
                <h2 className="text-2xl font-semibold tracking-tight">Agents</h2>
                <p className="text-muted-foreground">
                  List of approved agents.
                </p>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex flex-col md:flex-row items-center gap-3">
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
                <div>
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
                </div>
              </div>
              {loading ? (
                <div className="flex justify-center items-center h-40 gap-2 text-muted-foreground">
                  <Loader className="h-5 w-5 animate-spin" />
                  <p className="text-sm">Loading agents data...</p>
                </div>
              ) : filteredAgents.length === 0 ? (
                <div className="flex justify-center items-center h-40">
                  <p className="text-muted-foreground">No results found.</p>
                </div>
              ) : (
                <div className="bg-white rounded-md pb-3">
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
