import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { withAuth } from "@/utils/withAuth";
import { Role } from "@/constants/role";
import { lazy } from "react";

const App = lazy(() => import("@/App"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Profile = lazy(() => import("@/pages/user/Profile"));
const Verify = lazy(() => import("@/pages/Verify"));
const ProductDetails = lazy(() => import("@/pages/ProductDetails"));
const MyOrders = lazy(() => import("@/pages/user/MyOrders"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const MyOrderCarts = lazy(() => import("@/pages/user/MyOrderCarts"));
const OrderDetails = lazy(() => import("@/pages/admin/OrderDetails"));
const UpdateProduct = lazy(() => import("@/pages/admin/UpdateProduct"));
const Unauthorized = lazy(() => import("@/pages/Unauthorized"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const DashboardLayout = lazy(
  () => import("@/components/layouts/DashboardLayout")
);

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Home,
        path: "/",
      },
      {
        Component: About,
        path: "/about",
      },
      {
        Component: Contact,
        path: "/contact",
      },
      {
        Component: Checkout,
        path: "/checkout",
      },
      {
        Component: ProductDetails,
        path: "/product/:slug",
      },
      {
        Component: withAuth(Profile, ...Object.values(Role)),
        path: "/me",
      },
      {
        Component: withAuth(MyOrders, ...Object.values(Role)),
        path: "/me/orders",
      },
      {
        Component: withAuth(MyOrderCarts, ...Object.values(Role)),
        path: "/me/orders/:id",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, Role.ADMIN, Role.SUPER_ADMIN),
    path: "/admin",
    children: [
      {
        index: true,
        element: <Navigate to={"/admin/analytics"}></Navigate>,
      },

      ...generateRoutes(adminSidebarItems),
      {
        path: "/admin/orders/:id",
        Component: OrderDetails,
      },
      {
        path: "/admin/products/:slug",
        Component: UpdateProduct,
      },
    ],
  },
  {
    Component: Login,
    path: "/login",
  },

  {
    Component: Verify,
    path: "/verify",
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
