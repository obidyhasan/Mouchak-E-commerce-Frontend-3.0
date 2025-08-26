/* eslint-disable @typescript-eslint/no-explicit-any */

import SingleImageUploader from "@/components/SingleImageUploader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  productApi,
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "@/redux/features/product/product.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";

import z from "zod";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import type { IErrorResponse } from "@/types";
import { setLoading } from "@/redux/features/loadingSlice";

interface IProps {
  children: ReactNode;
  slug: string;
}

const addProductSchema = z.object({
  name: z
    .string("Name field required")
    .min(1, { message: "Name must be at least 1 characters" })
    .optional(),
  category: z
    .string("Category field required")
    .min(1, { message: "Category must be at least 1 characters" })
    .optional(),
  price: z
    .string("Price field required")
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0;
      },
      { message: "Price must be greater than 0" }
    )
    .optional(),
  description: z
    .string("Description field required")
    .min(1, { message: "Description must be at least 1 characters" })
    .optional(),
  status: z
    .string("Status field required")
    .min(1, { message: "Description must be at least 1 characters" })
    .optional(),
});

const EditProductDialog = ({ children, slug }: IProps) => {
  const [buttonDisable, setButtonDisable] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { data: product, isLoading: productIsLoading } =
    useGetSingleProductQuery(slug) || {};
  const [updateProduct] = useUpdateProductMutation();

  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: "",
      category: "",
      price: "",
      description: "",
      status: "",
    },
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        category: product.category,
        price: product.price?.toString() || "",
        description: product.description,
        status: product.status,
      });
    }
  }, [product, form]);

  useEffect(() => {
    dispatch(setLoading(productIsLoading));
  }, [productIsLoading, dispatch]);

  const onSubmit = async (data: any) => {
    setButtonDisable(true);
    const toastId = toast.loading("Product updating...");
    data.price = Number(data.price);

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (image) {
      formData.append("file", image as File);
    }

    try {
      const res = await updateProduct({ formData, id: product._id }).unwrap();
      dispatch(productApi.util.resetApiState());
      if (res.success) {
        setOpen(false);
        toast.success("Product updated successfully", { id: toastId });
      }
    } catch (err: unknown) {
      console.error(err);
      toast.error((err as IErrorResponse).message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      setButtonDisable(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <form
          id="edit-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="overflow-auto"
        >
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto w-full">
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
              <DialogDescription>
                Added Product to here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>

            <SingleImageUploader
              previewImg={product?.image}
              onChange={setImage}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pb-1">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter product name"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your product name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pb-1">Category</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter product category"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your product category.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pb-1">Status</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value || ""}
                      onValueChange={field.onChange}
                      {...field.onBlur}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem value="ACTIVE">Active</SelectItem>
                          <SelectItem value="INACTIVE">Inactive</SelectItem>
                          <SelectItem value="STOCK_OUT">Stock Out</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pb-1">Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter product price"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your product price.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pb-1">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="enter product description"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your product description.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button disabled={buttonDisable} form="edit-form" type="submit">
                Update Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
};

export default EditProductDialog;
