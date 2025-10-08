"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronsUpDown,
  Contact,
  HouseIcon,
  IdCard,
  Info,
  Mail,
  Phone,
  User,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { AgentsItem, getAgents } from "@/services/agents/agents.api";
import { DataTable } from "../ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Input } from "../ui/input";
import { DocumentPreview } from "../ui/document-preview";
import { Checkbox } from "../ui/checkbox";

export default function AgentApproval() {
  const [isZoomedID, setIsZoomedID] = useState(false);
  const [isZoomedSelfie, setIsZoomedSelfie] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [agents, setAgents] = useState<AgentsItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedAgentId, setSelectedAgentId] = useState("");

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

  // const duplicateAgents = useMemo(() => {
  //   return agents.filter((agent) => {
  //     const sameName =
  //       agent.FirstName?.trim().toLowerCase() ===
  //         selectedAgent.FirstName?.trim().toLowerCase() &&
  //       agent.LastName?.trim().toLowerCase() ===
  //         selectedAgent.LastName?.trim().toLowerCase();

  //     const sameBirthdate =
  //       new Date(agent.Birthdate).toISOString().split("T")[0] ===
  //       new Date(selectedAgent.Birthdate).toISOString().split("T")[0];

  //     return sameName || sameBirthdate;
  //   });
  // }, [agents, selectedAgent]);

  // Display logic — show duplicates, or all agents if searching
  const filteredAgents = useMemo(() => {
    const baseList =
      search.trim().length > 0
        ? agents
        : agents.length > 0
          ? agents
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
  }, [agents, agents, search]);

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
        //const isSelected = selectedAgentId === agent.AgentID;

        return (
          <div className="flex items-center justify-center">
            <Checkbox
              className="border-gray-400 text-gray-700 dark:border-gray-400 dark:text-white"
              //checked={isSelected}
              // onCheckedChange={() =>
              //   setSelectedAgentId(isSelected ? null : agent.AgentID)
              // }
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
      accessorKey: "ContactNumber",
      header: "Contact Number",
      cell: ({ row }) => (
        <span className="text-xs">{row.getValue("ContactNumber") || "N/A"}</span>
      ),
    },
    {
      accessorKey: "Birthdate",
      header: "Birthdate",
      cell: ({ row }) =>
        new Date(row.original.Birthdate).toLocaleDateString("en-US"),
    },
  ];

  return (
    <>
      <div className="flex items-center">
        <Link href="/agents-registration">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold ml-2">Agent Approval</h1>
      </div>

      <div className="w-full mx-auto px-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="rounded-md flex flex-col overflow-hidden border shadow-none md:col-span-1">
            <CardContent className="flex flex-col items-center text-center overflow-y-auto scrollbar-hide flex-1 p-4 pt-2">
              <div className="w-40 h-40 bg-white rounded-md mb-3 flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm">
                <Image
                  src="/image.png"
                  alt="Profile Picture"
                  width={160}
                  height={140}
                  className="object-cover w-full h-full"
                />
              </div>

              <h2 className="text-lg font-semibold mb-5 truncate w-full">
                John William Doe
              </h2>

              {/* Basic Info */}
              <div className="w-full space-y-3 mb-4 text-left">
                <div className="flex items-center gap-3">
                  <IdCard className="h-4 w-4 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="text-xs text-gray-500">Agent Registration ID</div>
                    <div className="text-xs font-medium truncate">22</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="text-xs text-gray-500">Employee ID Number</div>
                    <div className="text-xs font-medium truncate">27272</div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="w-full pt-4 border-t">
                <h3 className="text-sm font-semibold mb-3 text-left">
                  Contact Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 text-left">
                  {/* <div className="flex items-start gap-2">
                    <HouseIcon className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <label className="text-xs text-gray-500">Address</label>
                      <div className="text-xs font-medium break-words">
                        123 Example Street, Makati City
                      </div>
                    </div>
                  </div> */}

                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="text-xs text-gray-500">Email</div>
                      <div className="text-xs font-medium truncate"> johndoe@gmail.com</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Contact className="h-4 w-4 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="text-xs text-gray-500">Contact Number</div>
                      <div className="text-xs font-medium truncate">0927 282 8282</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="text-xs text-gray-500">Telephone Number</div>
                      <div className="text-xs font-medium truncate">45363738</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents Section */}
              <div className="w-full mt-6 pt-4 border-t">
                <h3 className="text-sm font-semibold mb-3 text-left">
                  Valid Documents
                </h3>

                <div className="space-y-5 text-left">
                  <DocumentPreview
                    title="ID Attachment"
                    imageSrc="/placeholder.png"
                    isZoomed={isZoomedID}
                    setIsZoomed={setIsZoomedID}
                  />

                  <DocumentPreview
                    title="Selfie with ID"
                    imageSrc="/placeholder.png"
                    isZoomed={isZoomedSelfie}
                    setIsZoomed={setIsZoomedSelfie}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

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
            <div className="mt-2">
              <div className="space-y-1 mb-5">
                <h2 className="text-2xl font-semibold tracking-tight">Agents</h2>
                <p className="text-sm text-muted-foreground">
                  Select the existing agent for account verification and validation
                </p>
              </div>
              <Input
                type="text"
                placeholder="Search all agents by name, contact, or ID..."
                className="bg-white w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-full">
              {filteredAgents.length > 0 ? (
                <DataTable
                  columns={agentColumns}
                  data={filteredAgents}
                  pageSize={10}
                  //rowSelection={selectedRowIds}
                  // onRowSelectionChange={(selection) => {
                  //   if (activeTab === "promote-crew") {
                  //     // Only allow selecting one crew at a time
                  //     const selectedKeys = Object.keys(selection).filter((key) => selection[key]);
                  //     const limitedSelection = selectedKeys.length > 0
                  //       ? { [selectedKeys[selectedKeys.length - 1]]: true }
                  //       : {};
                  //     setSelectedRowIds(limitedSelection);
                  //   } else {
                  //     setSelectedRowIds(selection);
                  //   }
                  // }}
                />
              ) : (
                <p className="text-gray-500 text-center py-6">
                  No agents found matching your search.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
