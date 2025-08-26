import { useEffect, useState } from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { setLoading } from "@/redux/features/loadingSlice";
import {
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} from "@/redux/features/order/order.api";
import { SearchIcon, SquareDashedBottom } from "lucide-react";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import { toast } from "sonner";
import type { IErrorResponse } from "@/types";
import { Link, useSearchParams } from "react-router";
import UpdateAlertDialog from "./UpdateAlertDialog";
import OrderFilters from "./OrderFilters";
import { Input } from "@/components/ui/input";

export const AllOrdersTable = () => {
  // Filter
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || undefined;

  // search
  const [searchTitle, setSearchTitle] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(8);

  const { data, isLoading: ordersLoading } = useGetAllOrdersQuery({
    searchTerm: searchTitle,
    status: status,
    page: currentPage,
    limit,
  });
  const orders = data?.data || [];
  const dispatch = useDispatch();
  const [updateOrder] = useUpdateOrderMutation();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [updateType, setUpdateType] = useState<"status" | "payment">("status");

  useEffect(() => {
    dispatch(setLoading(ordersLoading));
  }, [ordersLoading, dispatch]);

  const handleStatusUpdate = async (value: string, id: string) => {
    const toastId = toast.loading("Updating status...");
    try {
      const res = await updateOrder({
        updateInfo: { status: value },
        id,
      }).unwrap();
      if (res.success) {
        toast.success("Status updated successfully", { id: toastId });
      }
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.data?.message ||
          (err as IErrorResponse).message ||
          "Something went wrong",
        { id: toastId }
      );
    }
  };

  const handlePaymentStatusUpdate = async (value: string, id: string) => {
    const toastId = toast.loading("Updating payment status...");
    try {
      const res = await updateOrder({
        updateInfo: { paymentStatus: value },
        id,
      }).unwrap();
      if (res.success) {
        toast.success("Payment status updated successfully", { id: toastId });
      }
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.data?.message ||
          (err as IErrorResponse).message ||
          "Something went wrong",
        { id: toastId }
      );
    }
  };

  const totalPage = data?.meta?.totalPage || 1;

  return (
    <div>
      <div className="flex items-center justify-between gap-2 my-2 pb-5">
        <h1 className="text-xl font-semibold">Orders</h1>
        <div className="flex gap-2 items-center flex-wrap w-full justify-end">
          <div className="*:not-first:mt-2 max-w-sm w-full">
            <div className="relative w-full">
              <Input
                onChange={(e) => setSearchTitle(e.target.value)}
                className="peer ps-9  max-w-2xl"
                placeholder="Search by order Id, status, payment Status"
                type="search"
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <SearchIcon size={16} />
              </div>
            </div>
          </div>
          <OrderFilters />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>User</TableHead>
            <TableHead>Order Id</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order: any, idx: number) => (
            <TableRow className="space-x-2" key={idx}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-medium">{order?.user?.name}</div>
                    <span className="text-muted-foreground mt-0.5 text-xs">
                      {order?.user?.email}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="flex items-start flex-col gap-0.5">
                <span>
                  {format(
                    new Date(order?.createdAt),
                    "MMMM dd, yyyy - hh:mm a"
                  )}
                </span>
                <span className="text-muted-foreground text-xs">
                  {order?.orderId}
                </span>
              </TableCell>

              {/* Order Status */}
              <TableCell>
                <Select
                  value={order?.status}
                  onValueChange={(value) => {
                    setSelectedValue(value);
                    setSelectedId(order?._id || null);
                    setUpdateType("status");
                    setOpenDialog(true);
                  }}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Confirm">Confirm</SelectItem>
                      <SelectItem value="Picked">Picked</SelectItem>
                      <SelectItem value="InTransit">InTransit</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>

              {/* Payment Status */}
              <TableCell>
                <Select
                  value={order?.paymentStatus}
                  onValueChange={(value) => {
                    setSelectedValue(value);
                    setSelectedId(order?._id || null);
                    setUpdateType("payment");
                    setOpenDialog(true);
                  }}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="payment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Payment</SelectLabel>
                      <SelectItem value="PAID">PAID</SelectItem>
                      <SelectItem value="UNPAID">UNPAID</SelectItem>
                      <SelectItem value="REFUNDED">REFUNDED</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>

              <TableCell>
                <span className="text-base font-medium">
                  Tk. {Number(order?.totalAmount) + Number(order?.shippingCost)}
                </span>
              </TableCell>

              <TableCell className="text-right flex justify-end gap-2 flex-wrap">
                <Button size="icon">
                  <Link to={`/admin/orders/${order?.orderId}`}>
                    <SquareDashedBottom />
                  </Link>
                </Button>
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

      <UpdateAlertDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        selectedValue={selectedValue}
        selectedId={selectedId}
        onConfirm={
          updateType === "status"
            ? handleStatusUpdate
            : handlePaymentStatusUpdate
        }
        title={
          updateType === "status"
            ? "Confirm Status Update"
            : "Confirm Payment Status Update"
        }
      />
    </div>
  );
};
