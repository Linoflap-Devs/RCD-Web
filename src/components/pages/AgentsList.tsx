"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "../ui/button";
import { ArrowUpDown, Filter, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

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
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Agent Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Division
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-xs sm:text-sm text-center">
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
          <div className="p-2 sm:py-4 flex flex-col space-y-4 sm:space-y-5 h-full">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold mb-0">Agents List</h1>
            </div>

            <div className="flex flex-col space-y-4 sm:space-y-5 min-h-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4">
                <div className="relative w-full md:flex-1">
                  <Search className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 h-4 sm:h-4.5 w-4 sm:w-4.5 text-muted-foreground" />
                  <Input
                    placeholder="Search agents...."
                    className="pl-8 sm:pl-9 py-4 sm:py-4 text-xs sm:text-sm h-9 sm:h-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full">
                    <Select
                    //value={inactiveFilter}
                    //onValueChange={setInactiveFilter}
                    >
                      <SelectTrigger className="h-9 sm:h-10 px-3 sm:px-4 py-4 sm:py-5 text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 w-full flex-1">
                        <Filter className="h-4 sm:h-4.5 w-4 text-bold text-primary sm:w-4.5" />
                        <SelectValue placeholder="Filter by inactive" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All agents</SelectItem>
                        <SelectItem value="verified">Active</SelectItem>
                        <SelectItem value="pending">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
