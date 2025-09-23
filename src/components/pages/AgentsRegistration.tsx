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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AgentsItem, AgentsRegisItem, approveAgent, ExperienceItem, getAgents, getAgentsRegistrations } from "@/services/agents/agents.api";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "@/components/ui/use-toast";

type ApproveButtonProps = {
  AgentRegistrationID: number
  AgentID: number | null
  onApprove: (AgentRegistrationID: number, AgentID?: number) => Promise<void>
  children?: React.ReactNode
  Experience?: ExperienceItem[]; // <- array!
}

function ApproveAgentDialog({
  AgentRegistrationID,
  AgentID,
  onApprove,
  children,
}: ApproveButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children ?? (
          <button className="text-sm text-green-600 hover:underline">
            Approve
          </button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Do you want to approve agent with ID{" "}
            <span className="font-semibold">{AgentRegistrationID} , {AgentID}</span>?
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-200"
            onClick={() => onApprove(AgentRegistrationID, AgentID ?? undefined)}
          >
            Approve
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default function AgentsRegistrations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [agentsRegis, setAgentsRegis] = useState<AgentsRegisItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const debouncedSearch = useDebounce(searchTerm, 400);
  const [agents, setAgents] = useState<AgentsItem[]>([]); // to compare

  const handleApprove = async (AgentRegistrationID: number, AgentID?: number) => {
    try {
      await approveAgent(AgentRegistrationID, AgentID)
      toast({
        title: "Approved!",
        variant: "success",
        description: "The agent has been successfully approved."
      })
    } catch (error) {
      console.error("Error approving agent:", error)
      toast({
        title: "Error!",
        variant: "destructive",
        description: "There was an error approving the agent."
      })
    }
  }

  useEffect(() => {
    const fetchAgentsRegis = async () => {
      try {
        setLoading(true);
        const res = await getAgentsRegistrations();
        setAgentsRegis(res.data)
      } catch (err: any) {
        setError(err.message || "Failed to fetch agents registration list.");
      } finally {
        setLoading(false);
      }
    };

    fetchAgentsRegis();
  }, []);

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

  console.log(agentsRegis);
  console.log(agents);

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
      cell: ({ row }) => <div className="text-sm">{row.getValue("AgentRegistrationID")}</div>,
    },
    {
      accessorFn: (row) => `${row.FirstName} ${row.MiddleName || ""} ${row.LastName}`,
      id: "FullName",
      header: "Agent Name",
      cell: ({ row }) => <div className="text-sm">{row.getValue("FullName")}</div>,
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
      header: "ContactNumber",
      cell: ({ row }) => row.getValue("ContactNumber") ?? "N/A",
    },
    {
      id: "actions",
      header: () => <div className="text-center w-full"></div>,
      cell: ({ row }) => {
        const { AgentRegistrationID, FirstName, MiddleName, LastName } = row.original;

        const normalizeName = (name: string) =>
          name.replace(/\s+/g, " ").trim().toLowerCase();
        
        const fullName = normalizeName(`${FirstName} ${MiddleName ?? ""} ${LastName}`);

        const matchedAgent = agents.find(agent => {
          const agentFullName = normalizeName(`${agent.FirstName} ${agent.MiddleName ?? ""} ${agent.LastName}`);
          return agentFullName === fullName;
        });

        const AgentID = matchedAgent?.AgentID ?? null;
        console.log("AgentID:", AgentID);

        return (
          <div className="flex justify-center">
            <ApproveAgentDialog
              AgentRegistrationID={AgentRegistrationID}
              onApprove={handleApprove}
              AgentID={AgentID}
            >
            <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold text-green-800 bg-green-100 rounded-full shadow-sm hover:bg-green-200 hover:scale-105 transition-all duration-200 cursor-pointer">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Approve
            </span>
            </ApproveAgentDialog>
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
          <div className="p-2 sm:py-0 flex flex-col space-y-4 sm:space-y-6 h-full">
            <div className="flex flex-col space-y-5 sm:space-y-3.5 min-h-full">
              <div className="space-y-0.5">
                <h2 className="text-2xl font-semibold tracking-tight">Agents Registration List</h2>
                <p className="text-muted-foreground">
                  List of agents awaiting approval.
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
                {/* can filter here */}
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
