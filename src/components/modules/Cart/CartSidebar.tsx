import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FiShoppingCart } from "react-icons/fi";
import CartItem from "./CartItem";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectCarts } from "@/redux/features/cart/CartSlice";
import { useState } from "react";

export function CartSidebar() {
  const navigate = useNavigate();
  const [openSheet, setOpenSheet] = useState(false);
  const carts = useSelector(selectCarts);

  // calculate total price
  const totalPrice = carts.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const handleCheckoutButton = () => {
    setOpenSheet(false);
    navigate("/checkout");
  };

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      {/* Cart icon in navbar triggers the Sheet */}

      <SheetTrigger asChild>
        <div className="relative" aria-label="Open cart">
          <div className=" p-2 hover:text-primary cursor-pointer transition-colors duration-200 h-auto rounded-full hover:bg-transparent">
            <FiShoppingCart className="w-5 h-5" />
          </div>
          <Badge className=" border-background rounded-full w-5 h-5 absolute -top-0.5 left-full text-xs -translate-x-3.5 px-1">
            {carts.length}
          </Badge>
        </div>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            Review items in your shopping cart.
          </SheetDescription>
        </SheetHeader>

        <div className="overflow-auto">
          {carts.length ? (
            carts.map((item) => <CartItem key={item?.id} item={item} />)
          ) : (
            <p className="border border-dashed m-4 text-center py-20">
              Cart is empty
            </p>
          )}
        </div>

        <SheetFooter>
          <div className="flex justify-between items-center font-semibold">
            <span>Total</span> <span>Tk. {totalPrice}</span>
          </div>
          <Button
            disabled={carts?.length === 0}
            onClick={handleCheckoutButton}
            type="submit"
          >
            Checkout
          </Button>
          {/* <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
