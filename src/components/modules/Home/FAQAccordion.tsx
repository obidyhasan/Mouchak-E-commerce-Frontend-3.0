/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGetFaqsQuery } from "@/redux/features/faq/faq.api";
import { setLoading } from "@/redux/features/loadingSlice";
import { useAppDispatch } from "@/redux/hook";
import { useEffect } from "react";

export default function FAQAccordion() {
  const { data: faqs = [], isLoading } = useGetFaqsQuery(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div className="space-y-4 max-w-7xl mx-auto px-4 mb-12">
      <Accordion type="single" collapsible className="w-full " defaultValue="3">
        {faqs.map((item: any) => (
          <AccordionItem value={item?._id} key={item?._id} className="py-2 ">
            <AccordionTrigger className="py-2 text-[15px] cursor-pointer leading-6 hover:no-underline">
              <span className="text-base sm:text-lg font-medium">
                {item?.title}
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-2">
              <span className="text-base">{item?.description}</span>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
