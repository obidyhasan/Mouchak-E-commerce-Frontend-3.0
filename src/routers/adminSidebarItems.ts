import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/admin/Analytics"));
const Users = lazy(() => import("@/pages/admin/Users"));
const FAQ = lazy(() => import("@/pages/admin/FAQ"));
const Gallery = lazy(() => import("@/pages/admin/Gallery"));
const Orders = lazy(() => import("@/pages/admin/Orders"));
const Products = lazy(() => import("@/pages/admin/Products"));
const MouwalGallery = lazy(() => import("@/pages/admin/MouwalGallery"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
      {
        title: "Users",
        url: "/admin/users",
        component: Users,
      },
      {
        title: "Products",
        url: "/admin/products",
        component: Products,
      },
      {
        title: "Orders",
        url: "/admin/orders",
        component: Orders,
      },
      {
        title: "Gallery",
        url: "/admin/gallery",
        component: Gallery,
      },
      {
        title: "FAQ",
        url: "/admin/faq",
        component: FAQ,
      },
      {
        title: "Mouwal Gallery",
        url: "/admin/mouwal-gallery",
        component: MouwalGallery,
      },
    ],
  },
];
