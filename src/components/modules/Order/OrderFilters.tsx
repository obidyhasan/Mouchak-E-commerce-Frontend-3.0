import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useSearchParams } from "react-router";
import { Button } from "../../ui/button";
import { X } from "lucide-react";

export default function OrderFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedStatus = searchParams.get("status") || undefined;

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("status", value);
    setSearchParams(params);
  };

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("status");
    setSearchParams(params);
  };

  return (
    <div className="flex items-center gap-1">
      <Select
        onValueChange={(value) => handleStatusChange(value)}
        value={selectedStatus ? selectedStatus : ""}
      >
        <SelectTrigger>
          <SelectValue placeholder="Filter by Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Confirm">Confirm</SelectItem>
            <SelectItem value="Picked">Picked</SelectItem>
            <SelectItem value="In Transit">In Transit</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button size="icon" variant="outline" onClick={handleClearFilter}>
        <X />
      </Button>
    </div>
  );
}
