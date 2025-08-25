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
  useAddProductMutation,
} from "@/redux/features/product/product.api";
import type { IErrorResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import z from "zod";

interface IProps {
  children: ReactNode;
}

const addProductSchema = z.object({
  name: z
    .string("Name field required")
    .min(1, { message: "Name must be at least 1 characters" }),
  category: z
    .string("Category field required")
    .min(1, { message: "Category must be at least 1 characters" }),
  price: z.string("Price field required").refine(
    (val) => {
      const num = Number(val);
      return !isNaN(num) && num > 0;
    },
    { message: "Price must be greater than 0" }
  ),
  previousPrice: z.string("Previous Price field required").optional(),
  description: z
    .string("Description field required")
    .min(1, { message: "Description must be at least 1 characters" }),
});

const AddProductDialog = ({ children }: IProps) => {
  const [buttonDisable, setButtonDisable] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [addProduct] = useAddProductMutation();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: "",
      category: "",
      price: "",
      previousPrice: "",
      description: "",
    },
  });

  const onSubmit = async (data: any) => {
    setButtonDisable(true);
    const toastId = toast.loading("Product Adding...");
    data.price = Number(data.price);
    data.previousPrice = Number(data.previousPrice);
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", image as File);

    try {
      const res = await addProduct(formData).unwrap();
      dispatch(productApi.util.resetApiState());
      if (res.success) {
        setOpen(false);
        toast.success("Product added successfully", { id: toastId });
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
          id="add-product-form"
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

            <SingleImageUploader onChange={setImage} />

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
                      placeholder="enter previous  price"
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

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                form="add-product-form"
                disabled={!image || buttonDisable}
                type="submit"
              >
                Save Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
};

export default AddProductDialog;
