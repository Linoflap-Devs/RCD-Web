import { Calendar } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarPrimitive } from "@/components/ui/calendar";
import { useState } from "react";

interface DatePickerDateProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
}

export default function DatePickerDate({ value, onChange }: DatePickerDateProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    onChange?.(date); // notify parent
  };  

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="cleanwhite" className="justify-between font-regular">
          {selectedDate
            ? selectedDate.toLocaleString("default", { month: "long", year: "numeric" })
            : "Select Date"}
          <Calendar className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <CalendarPrimitive
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          showOutsideDays={false}
          captionLayout="dropdown"
          className="rounded-md border"
        />
      </PopoverContent>
    </Popover>
  );
}

