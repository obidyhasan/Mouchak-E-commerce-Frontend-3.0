/* eslint-disable @typescript-eslint/no-explicit-any */
import AddFAQDialog from "@/components/modules/FAQ/addFAQDialog";
import FAQCard from "@/components/modules/FAQ/FAQCard";
import { Button } from "@/components/ui/button";
import { useGetFaqsQuery } from "@/redux/features/faq/faq.api";
import { setLoading } from "@/redux/features/loadingSlice";
import { useAppDispatch } from "@/redux/hook";
import { useEffect } from "react";

const FAQ = () => {
  const { data, isLoading } = useGetFaqsQuery(undefined) || [];
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div>
      <div className="w-full flex justify-between items-center gap-2">
        <h1 className="text-xl font-semibold">FAQ</h1>
        <AddFAQDialog>
          <Button>Add FAQ</Button>
        </AddFAQDialog>
      </div>
      <div className="my-10">
        <div className="grid gap-5 grid-cols-1  md:grid-cols-2">
          {data?.map((item: any) => (
            <FAQCard faq={item} key={item?._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
