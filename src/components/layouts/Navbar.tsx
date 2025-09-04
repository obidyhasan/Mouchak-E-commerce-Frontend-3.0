import { useState } from "react";
import { HouseIcon, InboxIcon, ZapIcon } from "lucide-react";

import logo from "@/assets/icons/logo-icon.svg";
import UserMenu from "@/components/ui/user-menu";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CartSidebar } from "../modules/Cart/CartSidebar";
import useUser from "@/hooks/userUser";
import { LuUserRound } from "react-icons/lu";

// Navigation links array
const navigationLinks = [
  { href: "/", label: "Home", icon: HouseIcon },
  { href: "/about", label: "About", icon: InboxIcon },
  { href: "/contact", label: "Contact", icon: ZapIcon },
];

export default function Navbar() {
  const userInfo = useUser();
  const navigate = useNavigate();
  const location = useLocation(); // <-- Get current route
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const goToLoginPage = () => {
    navigate("/login");
  };

  return (
    <header className="border-b z-50 bg-background sticky top-0">
      <div className="max-w-7xl mx-auto w-full px-4 flex h-[70px] items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.href; // <-- dynamic active
                    return (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink
                          asChild
                          className="flex-row items-center gap-2 py-1.5"
                          active={isActive}
                        >
                          <Link
                            to={link.href}
                            className="flex items-center gap-2 w-full"
                            onClick={() => setIsPopoverOpen(false)}
                          >
                            <Icon
                              size={16}
                              className="text-muted-foreground/80"
                              aria-hidden="true"
                            />
                            {link.label}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Desktop menu */}
          <NavigationMenu className="max-md:hidden">
            <NavigationMenuList className="gap-2">
              {navigationLinks.map((link, index) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.href; // <-- dynamic active
                return (
                  <NavigationMenuItem key={index} className="w-full">
                    <NavigationMenuLink
                      asChild
                      className="flex-row items-center gap-2 py-1.5"
                      active={isActive}
                    >
                      <Link to={link.href} className="flex items-center gap-2">
                        <Icon
                          size={16}
                          className="text-muted-foreground/80"
                          aria-hidden="true"
                        />
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Middle side: Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-primary hover:text-primary/90">
            <img src={logo} className="w-32 sm:w-36 md:w-40" alt="logo" />
          </Link>
        </div>

        {/* Right side: Actions */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <CartSidebar />
          {userInfo ? (
            <UserMenu />
          ) : (
            <div
              onClick={goToLoginPage}
              className="p-2 border hover:text-primary cursor-pointer transition-colors duration-200 h-auto rounded-full hover:bg-transparent"
            >
              <LuUserRound className="w-5 h-5" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
