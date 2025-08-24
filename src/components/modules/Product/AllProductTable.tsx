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
  productApi,
  useDeleteProductMutation,
  useGetProductQuery,
} from "@/redux/features/product/product.api";
import { Pencil, Trash2 } from "lucide-react";
import DeleteAlertDialog from "@/components/DeleteAlertDialog";
import { toast } from "sonner";
import type { IErrorResponse } from "@/types";
import { useDispatch } from "react-redux";
import { Badge } from "@/components/ui/badge";
import { setLoading } from "@/redux/features/loadingSlice";
import { useEffect } from "react";
import { Link } from "react-router";

const AllProductTable = () => {
  const { data, isLoading } = useGetProductQuery(undefined) || [];
  const [deleteProduct] = useDeleteProductMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  const handleProductDelete = async (id: string) => {
    const toastId = toast.loading("Product deleting...");
    try {
      await deleteProduct(id).unwrap();
      dispatch(productApi.util.resetApiState());
      toast.success("Product deleted successfully", { id: toastId });
    } catch (err: unknown) {
      console.error(err);
      toast.error((err as IErrorResponse).message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Previous Price</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((product: any, idx: number) => (
            <TableRow className="space-x-2" key={idx}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    className="rounded-sm w-12 h-12 object-cover"
                    src={product?.image}
                    width={50}
                    height={50}
                    alt={product?.name}
                  />
                  <div>
                    <div className="font-medium">{product?.name}</div>
                    <span className="text-muted-foreground mt-0.5 text-xs">
                      {product.category}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {product?.status === "ACTIVE" && (
                  <Badge
                    variant="default"
                    className="text-xs rounded-full mx-auto w-max"
                  >
                    {product?.status}
                  </Badge>
                )}
                {product?.status === "INACTIVE" && (
                  <Badge
                    variant="outline"
                    className="text-xs rounded-full mx-auto w-max"
                  >
                    {product?.status}
                  </Badge>
                )}
                {product?.status === "STOCK_OUT" && (
                  <Badge
                    variant="destructive"
                    className="text-xs rounded-full mx-auto w-max"
                  >
                    {product?.status}
                  </Badge>
                )}
              </TableCell>
              <TableCell>Tk. {product?.price}</TableCell>
              <TableCell>Tk. {product?.previousPrice}</TableCell>

              <TableCell className="text-right flex justify-end gap-2 flex-wrap">
                <Button variant={"outline"} size={"icon"}>
                  <Link to={`/admin/products/${product?.slug}`}>
                    <Pencil />
                  </Link>
                </Button>
                <DeleteAlertDialog
                  onConfirm={() => handleProductDelete(product?._id)}
                >
                  <Button size="icon">
                    <Trash2 />
                  </Button>
                </DeleteAlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllProductTable;
