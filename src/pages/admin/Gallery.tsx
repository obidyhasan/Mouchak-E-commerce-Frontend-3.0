/* eslint-disable @typescript-eslint/no-explicit-any */
import AddImageDialog from "@/components/modules/gallery/addImageDialog";
import ImageCard from "@/components/modules/gallery/ImageCard";
import { Button } from "@/components/ui/button";
import { useGetImagesQuery } from "@/redux/features/gallery/gallery.api";
import { setLoading } from "@/redux/features/loadingSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Gallery = () => {
  const { data, isLoading } = useGetImagesQuery(undefined) || [];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div>
      <div className="w-full flex justify-between items-center gap-2">
        <h1 className="text-xl font-semibold">Gallery</h1>
        <AddImageDialog>
          <Button>Add Picture</Button>
        </AddImageDialog>
      </div>
      <div className="my-10">
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.map((gallery: any) => (
            <ImageCard gallery={gallery} key={gallery?._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
