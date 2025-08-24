/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import OrderCartItem from "./OrderCartItem";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const UserOrderCart = ({ order }: any) => {
  // calculate total price
  const totalPrice = order?.carts?.reduce((acc: any, item: any) => {
    return acc + item.amount * item.quantity;
  }, 0);

  console.log(order?.carts);

  return (
    <div className="border p-4 rounded-md">
      <div className="border-b flex flex-col gap-2 pb-3 mb-3">
        <div className="flex gap-3 justify-between items-center">
          <Badge>{order?.status}</Badge>
        </div>
        <div className="flex items-center flex-wrap gap-3 justify-between">
          <p>
            <span>Order Id: </span>
            <>{order?.orderId}</>
          </p>
          <Button>
            <Link to={order?.invoiceUrl} target="_blank">
              Invoice
            </Link>
          </Button>
        </div>
      </div>
      <div>
        {order?.carts?.map((cart: any, idx: number) => (
          <OrderCartItem key={idx} cart={cart} />
        ))}
      </div>
      <div>
        <div className="flex justify-between items-center font-semibold mt-2">
          <span>Subtotal</span> <span>Tk. {totalPrice}</span>
        </div>
        <div className="flex justify-between items-center font-semibold mt-2">
          <span>Shipping Cost</span>{" "}
          <span>
            {order?.shippingCost === 0 ? "Free" : `Tk. ${order?.shippingCost}`}
          </span>
        </div>
        <div className="flex border-t pt-2 justify-between items-center font-semibold mt-2">
          <span>Total</span>{" "}
          <span>Tk. {totalPrice + Number(order?.shippingCost)}</span>
        </div>
      </div>
    </div>
  );
};

export default UserOrderCart;
