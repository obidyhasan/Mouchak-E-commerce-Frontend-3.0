import { Role } from "@/constants/role";
import { adminSidebarItems } from "@/routers/adminSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case Role.SUPER_ADMIN:
      return [...adminSidebarItems];
    case Role.ADMIN:
      return [...adminSidebarItems];
  }
};
