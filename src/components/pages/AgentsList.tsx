"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "../ui/button";
import { ChevronsUpDown, Filter, MoreHorizontal, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

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
          className="text-xs font-regular"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ChevronsUpDown className="ml-1 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-xs sm:text-sm">
        {row.getValue("id")}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-xs font-regular"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Agent Name
          <ChevronsUpDown className="ml-1 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-xs sm:text-sm">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "division",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-xs text-[#020817]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Division
          <ChevronsUpDown className="ml-1 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-xs sm:text-sm">
        {row.getValue("division")}
      </div>
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
    header: () => (
      <div className="text-center w-full">Actions</div>
    ),
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
            {/* Header */}
            {/* <div className="flex flex-col mb-4">
              <h1 className="text-2xl font-bold text-primary mb-0">Agent management</h1>
              <div className="font-xs mb-0 text-muted-foreground">Here is the list of approved agents.</div>
            </div> */}
            <div className="flex flex-col space-y-5 sm:space-y-4 min-h-full">

              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                <div className="flex flex-row items-center gap-2">
                  <span className="text-xl font-semibold">All Agents</span>
                  <span className="text-lg text-muted-foreground">78</span>
                </div>

                {/* Right side: search + filter */}
                <div className="flex flex-col md:flex-row items-center gap-3">
                  {/* Search Input */}
                  <div className="relative rounded-lg">
                    <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      placeholder="Search..."
                      className="pl-7 text-xs sm:text-sm h-8 w-70" // fixed width
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Filter Select */}
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

              {/* DataTable */}
              <div>
                <DataTable columns={columns} data={data} pageSize={5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
