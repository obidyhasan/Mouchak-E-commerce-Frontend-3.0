import type { ISidebarItem } from "@/types";

export const generateRoutes = (sidebarItem: ISidebarItem[]) => {
  return sidebarItem.flatMap((section) =>
    section.items.map((route) => ({
      path: route.url,
      Component: route.component,
    }))
  );
};
