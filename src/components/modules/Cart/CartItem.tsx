/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { deleteCart, updateQuantity } from "@/redux/features/cart/CartSlice";
import { useAppDispatch } from "@/redux/hook";
import { useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";

const CartItem = ({ item }: any) => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(item?.quantity);

  const handleCartItemDelete = () => {
    dispatch(deleteCart(item?.id));
  };

  useEffect(() => {
    dispatch(updateQuantity({ id: item?.id, quantity: quantity }));
  }, [dispatch, item, quantity]);

  return (
    <div className=" border-b mx-2 sm:mx-4 py-2 sm:py-3 flex gap-3 items-center">
      <div className="w-16 h-16 sm:w-20 sm:h-20">
        <img
          src={item?.image}
          alt="cart item image"
          className="w-full h-full object-cover rounded-sm"
        />
      </div>
      <div className="grow space-y-0.5">
        <h1 className="text-sm sm:text-base">{item?.name}</h1>
        <div className="flex justify-between items-center w-full">
          <p className="text-xs sm:text-sm">
            Tk. {item?.price} X {item?.quantity}
          </p>
          <p className="text-xs sm:text-sm">
            Tk. {Number(item?.price) * Number(item?.quantity)}
          </p>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setQuantity(quantity - 1)}
              size={"icon"}
              variant={"outline"}
              disabled={quantity <= 1}
            >
              <FiMinus />
            </Button>
            <p>{quantity}</p>
            <Button
              onClick={() => setQuantity(quantity + 1)}
              size={"icon"}
              variant={"outline"}
            >
              <FiPlus />
            </Button>
          </div>
          <button onClick={handleCartItemDelete} className="text-primary">
            <TiDelete className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
