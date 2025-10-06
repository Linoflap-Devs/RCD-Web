"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "../../components/ui/button";
import {
  CheckCircle2,
  ChevronsUpDown,
  Loader,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { AgentsItem, AgentsRegisItem, getAgents, getAgentsRegistrations } from "@/services/agents/agents.api";
import { useDebounce } from "@/hooks/use-debounce";
import AgentApprovalDialog from "../dialogs/AgentApprovalDialog";

export default function AgentsRegistrations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [agentsRegis, setAgentsRegis] = useState<AgentsRegisItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const debouncedSearch = useDebounce(searchTerm, 400);
  const [agents, setAgents] = useState<AgentsItem[]>([]); // to compare
  const [viewselectedAgents, setviewSelectedAgents] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);

  useEffect(() => {
    const fetchAgentsRegis = async () => {
      try {
        setLoading(true);
        
        const [agentsRes, agentsRegisRes] = await Promise.all([
          getAgents(),
          getAgentsRegistrations(),
        ]);

        const unverifiedAgents = agentsRegisRes.data.filter(
          (agent: any) => agent.IsVerified !== 1
        );

        setAgents(agentsRes.data);
        //setAgentsRegis(agentsRegisRes.data);
        setAgentsRegis(unverifiedAgents);
      } catch (err: any) {
        setError(err.message || "Failed to fetch agents registration list.");
      } finally {
        setLoading(false);
      }
    };

    fetchAgentsRegis();
  }, []);

  const regex = new RegExp(debouncedSearch, "i");

  const filteredAgents = agentsRegis.filter((agent) => {
    const fullName = `${agent.FirstName} ${agent.MiddleName || ""} ${agent.LastName}`;
    return (
      regex.test(fullName) ||
      regex.test(agent.AgentRegistrationID.toString())
    );
  });

  const agentColumns: ColumnDef<AgentsRegisItem>[] = [
    {
      accessorKey: "AgentRegistrationID",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ChevronsUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="text-xs">{row.getValue("AgentRegistrationID")}</div>,
    },
    {
      accessorFn: (row) => `${row.FirstName} ${row.MiddleName || ""} ${row.LastName}`,
      id: "FullName",
      header: "Agent Name",
      cell: ({ row }) => {
        const fullName = row.getValue("FullName") as string;
        const firstLetter = fullName.charAt(0).toUpperCase();
        const gender = row.original.Gender;

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
      accessorKey: "Email",
      header: "Email",
      cell: ({ row }) => row.getValue("Email") ?? "N/A",
    },
    {
      accessorKey: "Gender",
      header: "Gender",
      cell: ({ row }) => row.getValue("Gender") ?? "N/A",
    },
    {
      accessorKey: "ContactNumber",
      header: "Contact Number",
      cell: ({ row }) => row.getValue("ContactNumber") ?? "N/A",
    },
    {
      id: "actions",
      header: () => <div className="text-center w-full"></div>,
      cell: ({ row }) => {
        const agentsRegis = row.original;
        
        return (
          <div className="flex justify-center">
            <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold text-green-800 bg-green-200 rounded-full shadow-sm hover:bg-green-300 hover:scale-105 transition-all duration-200 cursor-pointer"
              onClick={() => {
                setSelectedAgent(row.original);
                setviewSelectedAgents(true);
              }}
            >
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Approve
            </span>
          </div>
        )
      }
    }
  ];

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
                <h2 className="text-2xl font-semibold tracking-tight">Agents Registration List</h2>
                <p className="text-sm text-muted-foreground">
                  List of agents awaiting approval
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

      {selectedAgent && viewselectedAgents && (
        <AgentApprovalDialog
          open={viewselectedAgents}
          selectedAgent={selectedAgent}
          agents={agents}
          onOpenChange={setviewSelectedAgents}
        />        
      )}
    </>
  );
}
