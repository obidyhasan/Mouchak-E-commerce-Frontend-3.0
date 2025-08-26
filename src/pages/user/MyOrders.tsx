/* eslint-disable @typescript-eslint/no-explicit-any */
import UserOrderCard from "@/components/modules/Order/UserOrderCard";
import { setLoading } from "@/redux/features/loadingSlice";
import { useGetOrdersQuery } from "@/redux/features/order/order.api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const MyOrders = () => {
  const { data: orders, isLoading } = useGetOrdersQuery(undefined) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 md:py-10">
      <h1 className="font-medium text-lg md:text-xl mb-4">Orders</h1>

      <div className="space-y-4">
        {orders?.map((order: any, idx: number) => (
          <UserOrderCard key={idx} order={order} />
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
