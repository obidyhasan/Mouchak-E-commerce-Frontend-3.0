/* eslint-disable @typescript-eslint/no-explicit-any */
import DeleteAlertDialog from "@/components/DeleteAlertDialog";
import { Button } from "@/components/ui/button";
import { galleryApi } from "@/redux/features/gallery/gallery.api";
import { useDeleteMouwalImageMutation } from "@/redux/features/mouwalGallery/mouwalGallery.api";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const ImageCard = ({ gallery }: any) => {
  const [deleteImage] = useDeleteMouwalImageMutation();
  const dispatch = useDispatch();

  const handleImageDelete = async (id: string) => {
    const toastId = toast.loading("Image deleting...");
    try {
      await deleteImage(id).unwrap();
      dispatch(galleryApi.util.resetApiState());
      toast.success("Image deleted successfully", { id: toastId });
    } catch (error: any) {
      console.error(error);
      toast.error(error.data.message || error.data || "Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <div className="relative">
      <img
        src={gallery?.image}
        alt=""
        className="w-full h-80 object-cover rounded-md"
      />
      <DeleteAlertDialog onConfirm={() => handleImageDelete(gallery?._id)}>
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

export default ImageCard;
