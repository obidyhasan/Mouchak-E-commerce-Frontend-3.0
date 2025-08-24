/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckIcon } from "lucide-react";

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

interface IProps {
  order: any;
}

const UserOrderCard = ({ order }: IProps) => {
  console.log(order);

  return (
    <div className="border p-4 rounded-md">
      <div className="border-b flex flex-col gap-2 pb-3 mb-3">
        <div className="flex gap-3 justify-between items-center">
          <Badge>{order?.status}</Badge>
          <span className="text-sm">
            {format(new Date(order?.createdAt), "MMMM dd, yyyy - hh:mm a")}
          </span>
        </div>
        <div className="flex items-center flex-wrap gap-3 justify-between">
          <p>
            <span>Order Id:</span> {order?.orderId}
          </p>
          <Button asChild size={"sm"}>
            <Link to={`/me/orders/${order?.orderId}`}>View Order</Link>
          </Button>
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

export default UserOrderCard;
