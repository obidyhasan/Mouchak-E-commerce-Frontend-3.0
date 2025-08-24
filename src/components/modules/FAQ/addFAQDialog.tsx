/* eslint-disable @typescript-eslint/no-explicit-any */
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { faqApi, useAddFaqMutation } from "@/redux/features/faq/faq.api";
import { useAppDispatch } from "@/redux/hook";

import { zodResolver } from "@hookform/resolvers/zod";

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface IProps {
  children: ReactNode;
}

const faqSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Title is required" }),
});

const AddFAQDialog = ({ children }: IProps) => {
  const [buttonDisable, setButtonDisable] = useState(false);
  const [addFaq] = useAddFaqMutation();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof faqSchema>>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof faqSchema>) => {
    setButtonDisable(true);
    const toastId = toast.loading("FAQ Adding...");
    try {
      const res = await addFaq(data).unwrap();
      dispatch(faqApi.util.resetApiState());
      if (res.success) {
        setOpen(false);
        form.reset();
        toast.success("FAQ added successfully", { id: toastId });
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.data.message || error.data || "Something went wrong", {
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
          id="add-faq-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="overflow-auto"
        >
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto w-full">
            <DialogHeader>
              <DialogTitle>Add FAQ</DialogTitle>
              <DialogDescription>
                Added FAQ to here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-1">Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter faq title"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-1">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter faq description"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                disabled={buttonDisable}
                form="add-faq-form"
                type="submit"
              >
                Save FAQ
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
};

export default AddFAQDialog;
