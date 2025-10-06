import { useState, useMemo } from "react";
import {
  AgentsItem,
  AgentsRegisItem,
  approveAgent,
} from "@/services/agents/agents.api";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { DataTable } from "../ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ChevronsUpDown } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
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
} from "@/components/ui/alert-dialog";
import { toast } from "../ui/use-toast";

/** Confirmation dialog for approval */
function ApproveAgentDialog({
  AgentRegistrationID,
  AgentID,
  onApprove,
  children,
}: {
  AgentRegistrationID: number;
  AgentID: number | null;
  onApprove: (AgentRegistrationID: number, AgentID?: number) => Promise<void>;
  children?: React.ReactNode;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children ?? (
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            Approve
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Approval</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to approve this agent registration{" "}
            <span className="font-semibold">{AgentRegistrationID}</span>{" "}
            {AgentID ? (
              <>
                and link to existing Agent ID{" "}
                <span className="font-semibold">{AgentID}</span>?
              </>
            ) : (
              <>as a new agent?</>
            )} {" "} This action cannot be undone.
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
  );
}

export interface ApproveDialogProps {
  open: boolean;
  agents: AgentsItem[];
  selectedAgent: AgentsRegisItem;
  onOpenChange: (open: boolean) => void;
  onSelectAgent?: (agent: AgentsItem) => void;
}

export default function AgentApprovalDialog({
  open,
  agents,
  selectedAgent,
  onOpenChange,
  onSelectAgent,
}: ApproveDialogProps) {
  const [search, setSearch] = useState("");
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);

  if (!selectedAgent) return null;

  // Find possible duplicates
  const duplicateAgents = useMemo(() => {
    return agents.filter((agent) => {
      const sameName =
        agent.FirstName?.trim().toLowerCase() ===
          selectedAgent.FirstName?.trim().toLowerCase() &&
        agent.LastName?.trim().toLowerCase() ===
          selectedAgent.LastName?.trim().toLowerCase();

      const sameBirthdate =
        new Date(agent.Birthdate).toISOString().split("T")[0] ===
        new Date(selectedAgent.Birthdate).toISOString().split("T")[0];

      return sameName || sameBirthdate;
    });
  }, [agents, selectedAgent]);

  // Display logic — show duplicates, or all agents if searching
  const filteredAgents = useMemo(() => {
    const baseList =
      search.trim().length > 0
        ? agents
        : duplicateAgents.length > 0
        ? duplicateAgents
        : agents;

    if (!search.trim()) return baseList;

    const searchLower = search.toLowerCase();
    return baseList.filter(
      (a) =>
        a.FirstName?.toLowerCase().includes(searchLower) ||
        a.LastName?.toLowerCase().includes(searchLower) ||
        a.ContactNumber?.toLowerCase().includes(searchLower) ||
        a.AgentID?.toString().includes(searchLower)
    );
  }, [duplicateAgents, agents, search]);

  // Table columns
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
      cell: ({ row }) => (
        <span className="text-xs">{row.getValue("AgentID")}</span>
      ),
    },
    { accessorKey: "FirstName", header: "First Name" },
    { accessorKey: "LastName", header: "Last Name" },
    { accessorKey: "ContactNumber", header: "Contact Number" },
    {
      accessorKey: "Birthdate",
      header: "Birthdate",
      cell: ({ row }) =>
        new Date(row.original.Birthdate).toLocaleDateString("en-US"),
    },
  ];

  // Approve handler
  const handleApprove = async (
    AgentRegistrationID: number,
    AgentID?: number
  ) => {
    try {
      await approveAgent(AgentRegistrationID, AgentID);
      toast({
        title: "Approved!",
        variant: "success",
        description: "The agent has been successfully approved.",
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Error approving agent:", error);
      toast({
        title: "Error!",
        variant: "destructive",
        description: "There was an error approving the agent.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] p-8">
        <DialogHeader>
          <DialogTitle className="text-center text-xl text-gray-800 leading-none">
            <span className="block text-sm text-gray-500 mb-1 tracking-wide">
             Account Approval
            </span>
            <span className="text-primary font-semibold">
              {selectedAgent.FirstName} {selectedAgent.LastName}
            </span>
          </DialogTitle>
        </DialogHeader>

        {/* Search Field */}
        <div className="items-center mt-2">
          {/* <h3 className="text-md font-medium text-gray-700">
            {duplicateAgents.length > 0 && !search
              ? `Possible Duplicate Agent Records for: ${selectedAgent.FirstName} ${selectedAgent.LastName}`
              : "Search Agents"}
          </h3> */}
          <Input
            type="text"
            placeholder="Search all agents by name, contact, or ID..."
            className="w-full mt-2.5"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div>
          {filteredAgents.length > 0 ? (
            <DataTable
              columns={agentColumns}
              data={filteredAgents}
              pageSize={10}
              onRowClick={(agent: AgentsItem) => {
                setSelectedAgentId(agent.AgentID);
                onSelectAgent?.(agent);
              }}
              getRowClassName={(agent: AgentsItem) =>
                cn(
                  "cursor-pointer hover:bg-muted transition-colors",
                  selectedAgentId === agent.AgentID && "bg-primary/10"
                )
              }
            />
          ) : (
            <p className="text-gray-500 text-center py-4">
              No agents found matching your search.
            </p>
          )}
        </div>

        {/* Approval Button */}
        <div className="flex justify-end gap-2 mt-5">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </Button>

          {/* Approve button */}
          <ApproveAgentDialog
            AgentRegistrationID={selectedAgent.AgentRegistrationID}
            AgentID={selectedAgentId} // undefined if none selected
            onApprove={handleApprove}
          >
            <Button
              className={cn(
                "text-white",
                selectedAgentId
                  ? "bg-primary hover:bg-primary/80"
                  : "bg-green-600 hover:bg-green-700"
              )}
            >
              {selectedAgentId
                ? `Approve with Agent ID: ${selectedAgentId}`
                : "Approve as New Agent"}
            </Button>
          </ApproveAgentDialog>
        </div>
      </DialogContent>
    </Dialog>
  );
}
