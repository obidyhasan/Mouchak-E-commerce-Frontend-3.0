/* eslint-disable @typescript-eslint/no-explicit-any */
import { setLoading } from "@/redux/features/loadingSlice";
import { useGetAllOrdersQuery } from "@/redux/features/order/order.api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { CheckIcon } from "lucide-react";
import OrderCartItem from "@/components/modules/Order/OrderCartItem";

const OrderDetails = () => {
  const { id } = useParams();
  const { data: orders, isLoading } = useGetAllOrdersQuery(undefined) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  const order = orders?.find((order: any) => order?.orderId === id);

  // calculate total price
  const totalPrice = order?.carts?.reduce((acc: any, item: any) => {
    return acc + item.amount * item.quantity;
  }, 0);

  return (
    <div className="border p-4 rounded-md">
      <div className="border-b flex flex-col gap-2 pb-3 ">
        <div className="flex gap-3 justify-between items-center">
          <Badge>{order?.status}</Badge>
          <span className="text-sm">
            {format(
              new Date(order?.createdAt || new Date()),
              "MMMM dd, yyyy - hh:mm a"
            )}
          </span>
        </div>
        <div className="flex items-center flex-wrap gap-3 justify-between">
          <p>
            <span>Order Id:</span> {order?.orderId}
          </p>
          <div className="space-x-2">
            <Button variant={"outline"}>{order?.paymentStatus}</Button>
            <Button>
              <Link to={order?.invoiceUrl} target="_blank">
                Invoice
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Cart */}
      <div className="border-b mb-2 pb-3">
        <div>
          {order?.carts?.map((cart: any, idx: number) => (
            <OrderCartItem key={idx} cart={cart} />
          ))}
        </div>
        <div>
          <div className="flex justify-between items-center font-semibold mt-2">
            <span>Subtotal</span> <span>Tk. {totalPrice}</span>
          </div>
          <div className="flex justify-between items-center font-semibold mt-2">
            <span>Shipping Cost</span>{" "}
            <span>
              {order?.shippingCost === 0
                ? "Free"
                : `Tk. ${order?.shippingCost}`}
            </span>
          </div>
          <div className="flex justify-between border-t pt-2 items-center font-semibold mt-2">
            <span>Total</span>{" "}
            <span>Tk. {Number(totalPrice) + Number(order?.shippingCost)}</span>
          </div>
        </div>
      </div>

      <Timeline defaultValue={order?.statusLogs?.length} className="-space-y-5">
        {order?.statusLogs?.map((item: any, idx: number) => (
          <TimelineItem
            key={idx}
            step={idx}
            className="group-data-[orientation=vertical]/timeline:ms-10"
          >
            <TimelineHeader>
              <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
              <TimelineDate>
                {format(new Date(item.timestamp), "MMMM dd, yyyy - hh:mm a")}
              </TimelineDate>
              <TimelineTitle>{item.status}</TimelineTitle>
              <TimelineIndicator className="group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center group-data-completed/timeline-item:border-none group-data-[orientation=vertical]/timeline:-left-7">
                <CheckIcon
                  className="group-not-data-completed/timeline-item:hidden"
                  size={16}
                />
              </TimelineIndicator>
            </TimelineHeader>
            <TimelineContent>{item.note}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
};

export default OrderDetails;
