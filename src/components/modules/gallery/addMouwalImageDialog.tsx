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
import { Form } from "@/components/ui/form";
import {
  mouwalGalleryApi,
  useAddMouwalImageMutation,
} from "@/redux/features/mouwalGallery/mouwalGallery.api";

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface IProps {
  children: ReactNode;
}

const AddMouwalImageDialog = ({ children }: IProps) => {
  const [buttonDisable, setButtonDisable] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [addImage] = useAddMouwalImageMutation();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const form = useForm();

  const onSubmit = async () => {
    setButtonDisable(true);
    const toastId = toast.loading("Image Adding...");
    const formData = new FormData();
    formData.append("file", image as File);

    try {
      const res = await addImage(formData).unwrap();
      dispatch(mouwalGalleryApi.util.resetApiState());
      if (res.success) {
        setOpen(false);
        toast.success("Image added successfully", { id: toastId });
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
          id="add-gallery-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="overflow-auto"
        >
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto w-full">
            <DialogHeader>
              <DialogTitle>Add Image</DialogTitle>
              <DialogDescription>
                Added Image to here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>

            <SingleImageUploader onChange={setImage} />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                form="add-gallery-form"
                disabled={!image || buttonDisable}
                type="submit"
              >
                Save Image
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
};

export default AddMouwalImageDialog;
