import OrderChartDashboard from "@/components/modules/Order/OrderChartDashboard";
import { setLoading } from "@/redux/features/loadingSlice";
import { useOrderQuery, useUserQuery } from "@/redux/features/stats/stats.api";
import { useAppDispatch } from "@/redux/hook";
import { useEffect } from "react";

const Analytics = () => {
  const dispatch = useAppDispatch();

  const { data: user, isLoading: userIsLoading } = useUserQuery(undefined);
  const { data: order, isLoading: orderIsLoading } = useOrderQuery(undefined);

  useEffect(() => {
    dispatch(setLoading(userIsLoading || orderIsLoading));
  }, [userIsLoading, orderIsLoading, dispatch]);

  return (
    <div>
      {/* Summary Section */}
      <div className="relative overflow-hidden rounded-xl bg-muted py-14 px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 justify-between gap-5 text-center">
          <div className="flex flex-col gap-4">
            <p>Total Users</p>
            <span className="text-4xl font-semibold md:text-5xl">
              {user?.totalUser || 0}
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <p>Delivered</p>
            <span className="text-4xl font-semibold md:text-5xl">
              {order?.totalOrderByStatus?.Delivered || 0}
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <p>Confirm</p>
            <span className="text-4xl font-semibold md:text-5xl">
              {(order?.totalOrderByStatus?.Confirm || 0) +
                (order?.totalOrderByStatus?.Picked || 0) +
                (order?.totalOrderByStatus?.InTransit || 0)}
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <p>Pending</p>
            <span className="text-4xl font-semibold md:text-5xl">
              {order?.totalOrderByStatus?.Pending || 0}
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <p>Cancelled</p>
            <span className="text-4xl font-semibold md:text-5xl">
              {order?.totalOrderByStatus?.Cancelled || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="my-10">
        <OrderChartDashboard />
      </div>
    </div>
  );
};

export default Analytics;
