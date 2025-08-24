/* eslint-disable @typescript-eslint/no-explicit-any */

import UserOrderCart from "@/components/modules/Order/UserOrderCart";
import { setLoading } from "@/redux/features/loadingSlice";
import { useGetOrdersQuery } from "@/redux/features/order/order.api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

const MyOrderCarts = () => {
  const { id } = useParams();
  const { data: orders, isLoading } = useGetOrdersQuery(undefined) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  const order = orders?.find((order: any) => order?.orderId === id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 md:py-10">
      <h1 className="font-medium text-lg md:text-xl mb-4">Orders Details</h1>

      <div className="space-y-4">
        <UserOrderCart order={order} />
      </div>
    </div>
  );
};

export default MyOrderCarts;
