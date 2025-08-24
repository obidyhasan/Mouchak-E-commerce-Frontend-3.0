/* eslint-disable @typescript-eslint/no-explicit-any */

import SingleImageUploader from "@/components/SingleImageUploader";
import { Button } from "@/components/ui/button";
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
  useGetProductQuery,
  useUpdateProductMutation,
} from "@/redux/features/product/product.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import z from "zod";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import type { IErrorResponse } from "@/types";
import { setLoading } from "@/redux/features/loadingSlice";
import { useNavigate, useParams } from "react-router";

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
  previousPrice: z
    .string("Price field required")
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0;
      },
      { message: "Previous Price must be greater than 0" }
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

const UpdateProduct = () => {
  const { slug } = useParams();
  const [buttonDisable, setButtonDisable] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const dispatch = useDispatch();
  const { data, isLoading: productIsLoading } =
    useGetProductQuery(undefined) || [];
  const [updateProduct] = useUpdateProductMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: "",
      category: "",
      price: "",
      previousPrice: "",
      description: "",
      status: "",
    },
  });

  useEffect(() => {
    dispatch(setLoading(productIsLoading));
  }, [productIsLoading, dispatch]);

  const product = data?.find((product: any) => product?.slug === slug);

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        category: product.category,
        price: product.price?.toString() || "",
        previousPrice: product.previousPrice?.toString() || "",
        description: product.description,
        status: product.status,
      });
    }
  }, [product, form]);

  const onSubmit = async (data: any) => {
    setButtonDisable(true);
    const toastId = toast.loading("Product updating...");
    data.price = Number(data.price);
    data.previousPrice = Number(data.previousPrice);

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (image) {
      formData.append("file", image as File);
    }

    try {
      const res = await updateProduct({ formData, id: product._id }).unwrap();
      dispatch(productApi.util.resetApiState());
      if (res.success) {
        toast.success("Product updated successfully", { id: toastId });
        navigate("/admin/products", { replace: true });
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
    <div className="max-w-lg mx-auto w-full">
      <Form {...form}>
        <form
          id="edit-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-4 space-y-3"
        >
          <div className="pb-3">
            <SingleImageUploader
              previewImg={product?.image}
              onChange={setImage}
            />
          </div>

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
                    defaultValue={product?.status}
                    onValueChange={field.onChange}
                    {...field.onBlur}
                    {...field.onChange}
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
            name="previousPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pb-1">Previous Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter product previous price"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  This is your product previous price.
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

          <Button
            className="mt-2"
            disabled={buttonDisable}
            form="edit-form"
            type="submit"
          >
            Update Product
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateProduct;
