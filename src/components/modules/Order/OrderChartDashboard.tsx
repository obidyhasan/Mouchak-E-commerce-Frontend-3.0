import { useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import { useOrderQuery } from "@/redux/features/stats/stats.api";

const COLORS = ["#4f46e5", "#22c55e", "#f97316", "#ef4444"];

const OrderChartDashboard = () => {
  const { data: stats, isLoading } = useOrderQuery(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  const pieData = useMemo(() => {
    if (!stats?.totalOrderByStatus) return [];
    return Object.entries(stats?.totalOrderByStatus).map(([name, value]) => ({
      name,
      value,
    }));
  }, [stats]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="rounded-md shadow-none">
        <CardHeader>
          <CardTitle>Monthly Order Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats?.monthlyOrders || []}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill={COLORS[0]} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Delivery Status Distribution */}
      <Card className="rounded-md shadow-none">
        <CardHeader>
          <CardTitle>Delivery Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderChartDashboard;
