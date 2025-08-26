/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { setLoading } from "@/redux/features/loadingSlice";
import { useAppDispatch } from "@/redux/hook";
import { useEffect, useState } from "react";
import {
  useAllUsersQuery,
  useUpdateUserMutation,
} from "@/redux/features/auth/auth.api";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import StatusUpdateAlertDialog from "./StatusUpdateAlertDialog";
import { toast } from "sonner";

export function AllUsersTable() {
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(8);

  // search
  const [searchTitle, setSearchTitle] = useState("");

  const { data, isLoading } = useAllUsersQuery({
    searchTerm: searchTitle,
    page: currentPage,
    limit,
  });
  const users = data?.data || [];
  const [updateUser] = useUpdateUserMutation();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  const handleStatusUpdate = async (value: string, id: string) => {
    const toastId = toast.loading("Updating role...");
    try {
      const res = await updateUser({
        userInfo: { role: value },
        id,
      }).unwrap();
      if (res.success) {
        toast.success("Role updated successfully", { id: toastId });
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.data.message || error.data || "Something went wrong", {
        id: toastId,
      });
    }
  };

  const totalPage = data?.meta?.totalPage || 1;

  return (
    <>
      <div className="flex items-center justify-between gap-2 my-2 pb-5">
        <h1 className="text-lg font-bold mb-4">Users</h1>
        <div className="flex gap-2 items-center flex-wrap w-full justify-end">
          <div className="*:not-first:mt-2 max-w-sm w-full">
            <div className="relative w-full">
              <Input
                onChange={(e) => setSearchTitle(e.target.value)}
                className="peer ps-9  max-w-2xl"
                placeholder="Search by name, email role, phone, address"
                type="search"
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <SearchIcon size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="text-right">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user: any) => (
            <TableRow key={user?._id}>
              <TableCell className="font-medium">
                {user?.name || "N/A"}
              </TableCell>
              <TableCell>{user?.email}</TableCell>

              <TableCell>
                <Select
                  value={user?.role}
                  onValueChange={(value) => {
                    setSelectedValue(value);
                    setSelectedId(user?._id || null);
                    setOpenDialog(true);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="ADMIN">ADMIN</SelectItem>
                      <SelectItem value="USER">USER</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>

              <TableCell>{user?.phone || "N/A"}</TableCell>
              <TableCell>
                {user?.address || "N/A"} - {user?.division || "N/A"}
              </TableCell>

              <TableCell className="text-right flex flex-wrap gap-2 justify-end">
                {format(new Date(user?.createdAt), "MMMM dd, yyyy")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-end my-8">
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                (page) => (
                  <PaginationItem
                    key={page}
                    onClick={() => setCurrentPage(page)}
                  >
                    <PaginationLink isActive={currentPage === page}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className={
                    currentPage === totalPage
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      <StatusUpdateAlertDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        selectedValue={selectedValue}
        selectedId={selectedId}
        onConfirm={handleStatusUpdate}
        title={"Confirm Status Update"}
      />
    </>
  );
}
