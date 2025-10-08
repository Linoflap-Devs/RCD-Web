"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronsUpDown,
  Contact,
  IdCard,
  Info,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import { DocumentPreview } from "@/components/ui/document-preview";
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
import { useAgentApproval } from "@/store/useAgentApproval";
import { AgentsItem, approveAgent, getAgents } from "@/services/agents/agents.api";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

/** Confirmation dialog for approval */
function ApproveAgentDialog({
  AgentRegistrationID,
  AgentID,
  onApprove,
  children,
}: {
  AgentRegistrationID: number | undefined;
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
            )}{" "}
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-200"
            onClick={() => {
              if (AgentRegistrationID)
                onApprove(AgentRegistrationID, AgentID ?? undefined);
            }}
          >
            Approve
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function AgentApproval() {
  const router = useRouter();
  const [isZoomedID, setIsZoomedID] = useState(false);
  const [isZoomedSelfie, setIsZoomedSelfie] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [agents, setAgents] = useState<AgentsItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);
  const { selectedAgent } = useAgentApproval();

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

  console.log(agents);

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

      router.push("/agents-registration");
    } catch (error) {
      console.error("Error approving agent:", error);
      toast({
        title: "Error!",
        variant: "destructive",
        description: "There was an error approving the agent.",
      });
    }
  };

  // Duplicate detection (same name + same birthdate)
  const duplicateAgents = useMemo(() => {
    if (!selectedAgent || !selectedAgent.Birthdate) return [];
    return agents.filter((agent) => {
      const sameName =
        agent.FirstName?.trim().toLowerCase() ===
        selectedAgent.FirstName?.trim().toLowerCase() &&
        agent.LastName?.trim().toLowerCase() ===
        selectedAgent.LastName?.trim().toLowerCase();

      const sameBirthdate =
        agent.Birthdate &&
        selectedAgent.Birthdate &&
        new Date(agent.Birthdate).toISOString().split("T")[0] ===
        new Date(selectedAgent.Birthdate).toISOString().split("T")[0];

      return sameName || sameBirthdate;
    });
  }, [agents, selectedAgent]);

  // Search filter
  const filteredAgents = useMemo(() => {
    const searchLower = search.toLowerCase();

    return agents.filter((a) =>
      a.FirstName?.toLowerCase().includes(searchLower) ||
      a.LastName?.toLowerCase().includes(searchLower) ||
      a.ContactNumber?.toLowerCase().includes(searchLower) ||
      a.AgentID?.toString().includes(searchLower)
    );
  }, [agents, search]);

  // Table columns
  const agentColumns: ColumnDef<AgentsItem>[] = [
    {
      id: "select",
      header: () => (
        <span className="text-xs font-medium text-gray-600 flex justify-center">
          Choose one
        </span>
      ),
      cell: ({ row }) => {
        const agent = row.original;
        const isSelected = selectedAgentId === agent.AgentID;
        return (
          <div className="flex items-center justify-center">
            <Checkbox
              className="border-gray-400 text-gray-700"
              checked={isSelected}
              onCheckedChange={() =>
                setSelectedAgentId(isSelected ? null : agent.AgentID)
              }
              aria-label={`Select agent ${agent.AgentID}`}
            />
          </div>
        );
      },
    },
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
    {
      accessorFn: (row) =>
        `${row.FirstName ?? ""} ${row.MiddleName ?? ""} ${row.LastName ?? ""}`,
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
            <div
              className={`w-6 h-6 rounded-full ${bgColor} flex items-center justify-center text-gray-600 text-xs font-medium`}
            >
              {firstLetter}
            </div>
            <div className="text-xs font-semibold ml-1">
              {fullName.toUpperCase()}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "ContactNumber",
      header: "Contact Number",
      cell: ({ row }) => (
        <span className="text-xs">
          {row.getValue("ContactNumber") || "N/A"}
        </span>
      ),
    },
    {
      accessorKey: "Birthdate",
      header: "Birthdate",
      cell: ({ row }) => {
        const birthdate = row.original.Birthdate;
        return (
          <span className="text-xs">
            {birthdate
              ? new Date(birthdate).toLocaleDateString("en-US")
              : "N/A"}
          </span>
        );
      },
    },
  ];

  // Extract agent images
  const profileImage = selectedAgent?.Images?.find(
    (img) => img.ImageType?.toLowerCase() === "profile"
  );
  const govID = selectedAgent?.Images?.find(
    (img) =>
      img.ImageType?.toLowerCase() === "id" ||
      img.ImageType?.toLowerCase() === "govid"
  );
  const selfieID = selectedAgent?.Images?.find(
    (img) => img.ImageType?.toLowerCase() === "selfie"
  );

  const profileSrc = profileImage
    ? `data:${profileImage.ContentType};base64,${profileImage.FileContent}`
    : "/image.png";
  const govIDSrc = govID
    ? `data:${govID.ContentType};base64,${govID.FileContent}`
    : "/placeholder.png";
  const selfieSrc = selfieID
    ? `data:${selfieID.ContentType};base64,${selfieID.FileContent}`
    : "/placeholder.png";

  return (
    <>
      <div className="flex items-center mb-0">
        <Link href="/agents-registration">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold ml-2">Agent Approval</h1>
      </div>

      <div className="w-full mx-auto px-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* LEFT PANEL */}
          <Card className="rounded-md flex flex-col overflow-hidden border shadow-none md:col-span-1">
            <CardContent className="flex flex-col items-center text-center flex-1 p-4 pt-2">
              <div className="w-40 h-40 bg-white rounded-md mb-3 flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm">
                <Image
                  src={profileSrc}
                  alt="Profile Picture"
                  width={160}
                  height={140}
                  className="object-cover w-full h-full"
                />
              </div>

              <h2 className="text-lg font-semibold mb-5 truncate w-full">
                {selectedAgent
                  ? `${selectedAgent.FirstName ?? ""} ${selectedAgent.MiddleName ?? ""
                  } ${selectedAgent.LastName ?? ""}`
                  : "N/A"}
              </h2>

              {/* Basic Info */}
              <div className="w-full space-y-3 mb-4 text-left">
                <div className="flex items-center gap-3">
                  <IdCard className="h-4 w-4 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="text-xs text-gray-500">Agent Registration ID</div>
                    <div className="text-xs font-medium truncate">{selectedAgent?.AgentRegistrationID ?? 0}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="text-xs text-gray-500">Employee ID Number</div>
                    <div className="text-xs font-medium truncate">{selectedAgent?.EmployeeIdNumber ?? 0}</div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="w-full pt-4 border-t">
                <h3 className="text-sm font-semibold mb-3 text-left">
                  Contact Information
                </h3>

                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-primary" />
                    <div>
                      <div className="text-xs text-gray-500">Email</div>
                      <div className="text-xs font-medium truncate">
                        {selectedAgent?.Email ?? "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Contact className="h-4 w-4 text-primary" />
                    <div>
                      <div className="text-xs text-gray-500">
                        Contact Number
                      </div>
                      <div className="text-xs font-medium truncate">
                        {selectedAgent?.ContactNumber ?? "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-primary" />
                    <div>
                      <div className="text-xs text-gray-500">
                        Telephone Number
                      </div>
                      <div className="text-xs font-medium truncate">
                        {selectedAgent?.TelephoneNumber ?? "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="w-full mt-6 pt-4 border-t">
                <h3 className="text-sm font-semibold mb-3 text-left">
                  Valid Documents
                </h3>

                <div className="space-y-5 text-left">
                  <DocumentPreview
                    title="ID Attachment"
                    imageSrc={govIDSrc}
                    isZoomed={isZoomedID}
                    setIsZoomed={setIsZoomedID}
                  />
                  <DocumentPreview
                    title="Selfie with ID"
                    imageSrc={selfieSrc}
                    isZoomed={isZoomedSelfie}
                    setIsZoomed={setIsZoomedSelfie}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* RIGHT PANEL */}
          <div className="md:col-span-3 flex flex-col space-y-5">
            {/* <div className="flex items-center gap-3 rounded-md border border-primary/30 bg-primary/10 p-4">
              <Info className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-primary">Note:</p>
                <p className="text-sm text-primary">
                  Select the existing agent for verification and validation.
                </p>
              </div>
            </div> */}

            <div className="space-y-1 mb-5">
              <h2 className="text-2xl font-semibold tracking-tight">
                Agents
              </h2>
              <p className="text-sm text-muted-foreground">
                Select an existing agent for verification and validation
              </p>
            </div>

            <Input
              type="text"
              placeholder="Search all agents by name, contact, or ID..."
              className="bg-white w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="w-full">
              {filteredAgents.length > 0 ? (
                <DataTable columns={agentColumns} data={filteredAgents} pageSize={10} />
              ) : (
                <p className="text-gray-500 text-center py-6">
                  No agents found matching your search.
                </p>
              )}
            </div>

            {/* Approval Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                className="border-gray-300 hover:bg-gray-100"
                onClick={() => router.push("/agents-registration")}
              >
                Reject
              </Button>

              <ApproveAgentDialog
                AgentRegistrationID={selectedAgent?.AgentRegistrationID!} // assuming this always exists
                AgentID={selectedAgentId}
                onApprove={handleApprove}
              >
                <Button
                  disabled={!selectedAgentId} // disable if no existing agent selected
                  className={cn(
                    "text-white bg-green-600 hover:bg-green-700",
                    !selectedAgentId && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {selectedAgentId ? `Approve with Agent ID: ${selectedAgentId}` : "Select an Agent to Approve"}
                </Button>
              </ApproveAgentDialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
