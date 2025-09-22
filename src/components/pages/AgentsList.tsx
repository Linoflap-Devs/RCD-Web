"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "../ui/button";
import {
  ChevronsUpDown,
  Filter,
  InfoIcon,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Card, CardContent } from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Agents = {
  id: string;
  name: string;
  properties?: number;
  division: string;
  divisions?: string;
};

const columns: ColumnDef<Agents>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ChevronsUpDown className="ml-1 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-sm sm:text-sm">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Agent Name
          <ChevronsUpDown className="ml-1 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-sm sm:text-sm">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "division",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Division
          <ChevronsUpDown className="ml-1 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-sm sm:text-sm">{row.getValue("division")}</div>
    ),
  },
  {
    accessorKey: "properties",
    header: "Properties Assigned",
    cell: ({ row }) => row.getValue("properties") ?? 0,
  },
  {
    accessorKey: "divisions",
    header: "Divisions Assigned",
    cell: ({ row }) => row.getValue("divisions") ?? "N/A",
  },
  {
    id: "actions",
    header: () => <div className="text-center w-full"></div>,
    cell: ({ row }) => {
      //const crew = row.original;

      return (
        <div className="text-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-7 sm:h-8 w-7 sm:w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-xs sm:text-sm">
              <DropdownMenuItem asChild className="text-xs sm:text-sm">
                {/* <Link
                  href={`/home/crew/details?id=${crew.CrewCode}&tab=allottee`}
                >
                  <Users className="mr-1.5 sm:mr-2 h-3.5 sm:h-4 w-3.5 sm:w-4" />
                  View
                </Link> */}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

const data: Agents[] = [
  { id: "1", name: "Juan Dela Cruz", division: "Living Hope Division" },
  { id: "2", name: "Carlos Santos", division: "Living Hope Division" },
  { id: "3", name: "Juan Dela Cruz", division: "Living Hope Division" },
  { id: "4", name: "Carlos Santos", division: "Living Hope Division" },
  { id: "1", name: "Juan Dela Cruz", division: "Living Hope Division" },
  { id: "2", name: "Carlos Santos", division: "Living Hope Division" },
  { id: "3", name: "Juan Dela Cruz", division: "Living Hope Division" },
  { id: "4", name: "Carlos Santos", division: "Living Hope Division" },
  { id: "1", name: "Juan Dela Cruz", division: "Living Hope Division" },
  { id: "2", name: "Carlos Santos", division: "Living Hope Division" },
  { id: "3", name: "Juan Dela Cruz", division: "Living Hope Division" },
  { id: "4", name: "Carlos Santos", division: "Living Hope Division" },
  { id: "1", name: "Juan Dela Cruz", division: "Living Hope Division" },
  { id: "2", name: "Carlos Santos", division: "Living Hope Division" },
  { id: "3", name: "Juan Dela Cruz", division: "Living Hope Division" },
  { id: "4", name: "Carlos Santos", division: "Living Hope Division" },
];

export default function AgentsList() {
  const [searchTerm, setSearchTerm] = useState("");

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
          <div className="p-2 sm:py-0 flex flex-col space-y-4 sm:space-y-5 h-full">
            <div className="flex flex-col space-y-5 sm:space-y-3.5 min-h-full">
              {/* <div className="items-center gap-2">
                <span className="text-2xl font-semibold">All Agents</span>
              </div> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-stretch">
                <Card className="bg-primary rounded-lg border shadow-none flex flex-col justify-center">
                  <CardContent className="flex flex-col gap-2">
                    <div className="space-y-1">
                      <div className="text-sm text-white flex items-center justify-between">
                        <span>Total Active Agents</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <InfoIcon className="h-4 w-4 text-white/80 cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent side="top" align="end">
                              <p>
                                This is the number of currently active agents
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <div className="text-2xl font-bold tracking-tight text-white flex items-center">
                        2,400
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="rounded-lg border shadow-none flex flex-col justify-center">
                  <CardContent className="flex flex-col gap-2">
                    <div className="space-y-1">
                      <div className="text-sm flex items-center justify-between">
                        <span>Total Active Agents</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <InfoIcon className="h-4 w-4 text-primary/80 cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent side="top" align="end">
                              <p>
                                This is the number of currently active agents
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <div className="text-2xl font-bold tracking-tight text-primary flex items-center">
                        2,400
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="rounded-lg border shadow-none flex flex-col justify-center">
                  <CardContent className="flex flex-col gap-2">
                    <div className="space-y-1">
                      <div className="text-sm flex items-center justify-between">
                        <span>Total Active Agents</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <InfoIcon className="h-4 w-4 text-primary/80 cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent side="top" align="end">
                              <p>
                                This is the number of currently active agents
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <div className="text-2xl font-bold tracking-tight text-primary flex items-center">
                        2,400
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="rounded-lg border shadow-none flex flex-col justify-center">
                  <CardContent className="flex flex-col gap-2">
                    <div className="space-y-1">
                      <div className="text-sm flex items-center justify-between">
                        <span>Total Active Agents</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <InfoIcon className="h-4 w-4 text-primary/80 cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent side="top" align="end">
                              <p>
                                This is the number of currently active agents
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <div className="text-2xl font-bold tracking-tight text-primary flex items-center">
                        2,400
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
              <div>
                <DataTable columns={columns} data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
