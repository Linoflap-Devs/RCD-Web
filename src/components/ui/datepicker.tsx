import { Calendar } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarPrimitive } from "@/components/ui/calendar";
import { useState } from "react";

export default function DatePickerMonthYear() {
  const [selectedMonth, setSelectedMonth] = useState<Date | undefined>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="cleanwhite" className="justify-between font-regular">
          {selectedMonth
            ? selectedMonth.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })
            : "Select Month & Year"}
          <Calendar className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <CalendarPrimitive
          mode="single"
          selected={selectedMonth}
          onSelect={(date) => setSelectedMonth(date)}
          showOutsideDays={false} // optional
          captionLayout="dropdown" // month/year dropdowns
          className="rounded-md border"
          components={{
            Day: () => <div className="hidden" />, // hide day cells
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
