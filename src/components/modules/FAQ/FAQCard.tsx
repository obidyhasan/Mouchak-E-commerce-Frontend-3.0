/* eslint-disable @typescript-eslint/no-explicit-any */
import DeleteAlertDialog from "@/components/DeleteAlertDialog";
import { Button } from "@/components/ui/button";
import { faqApi, useDeleteFaqMutation } from "@/redux/features/faq/faq.api";
import { useAppDispatch } from "@/redux/hook";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const FAQCard = ({ faq }: any) => {
  const [deleteFaq] = useDeleteFaqMutation();
  const dispatch = useAppDispatch();

  const handleFaqDelete = async (id: string) => {
    const toastId = toast.loading("FAQ deleting...");
    try {
      await deleteFaq(id).unwrap();
      dispatch(faqApi.util.resetApiState());
      toast.success("FAQ deleted successfully", { id: toastId });
    } catch (error: any) {
      console.error(error);
      toast.error(error.data.message || error.data || "Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <div className="relative border rounded-sm p-4">
      <div>
        <h1 className="font-medium">{faq?.title}</h1>
        <p className="text-sm mt-4">{faq?.description}</p>
      </div>
      <DeleteAlertDialog onConfirm={() => handleFaqDelete(faq?._id)}>
        <Button
          variant={"outline"}
          size={"icon"}
          className="absolute top-2 p-2 right-2"
        >
          <Trash2 />
        </Button>
      </DeleteAlertDialog>
    </div>
  );
};

export default FAQCard;
