import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function MonthYearPicker({
  value,
  onChange,
}: {
  value?: Date;
  onChange: (d: Date) => void;
}) {
  const [year, setYear] = useState(value?.getFullYear() ?? new Date().getFullYear());
  const [month, setMonth] = useState(value?.getMonth() ?? new Date().getMonth());

  const handleChange = (m: number, y: number) => {
    onChange(new Date(y, m, 3)); // always first day of month
  };

  return (
    <div className="flex gap-3 items-center">
      {/* Month Picker */}
      <Select
        value={month.toString()}
        onValueChange={(val) => {
          const m = parseInt(val);
          setMonth(m);
          handleChange(m, year);
        }}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Select month" />
        </SelectTrigger>
        <SelectContent>
          {months.map((m, i) => (
            <SelectItem key={i} value={i.toString()}>
              {m}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Year Picker */}
      <Select
        value={year.toString()}
        onValueChange={(val) => {
          const y = parseInt(val);
          setYear(y);
          handleChange(month, y);
        }}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((y) => (
            <SelectItem key={y} value={y.toString()}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
