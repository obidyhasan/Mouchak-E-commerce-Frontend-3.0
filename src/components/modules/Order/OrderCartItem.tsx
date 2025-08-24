/* eslint-disable @typescript-eslint/no-explicit-any */

const OrderCartItem = ({ cart }: any) => {
  return (
    <div className=" border-b py-2 sm:py-3 flex gap-3 items-center">
      <div className="w-16 h-16">
        <img
          src={cart?.product?.image}
          alt="cart item image"
          className="w-full h-full object-cover rounded-sm"
        />
      </div>
      <div className="grow space-y-0.5">
        <h1 className="font-medium">{cart?.product?.name}</h1>
        <div className="flex justify-between items-center w-full">
          <p className="text-sm">
            Tk. {cart?.product?.price} X {cart?.quantity}
          </p>
          <p>Tk. {Number(cart?.product?.price) * Number(cart?.quantity)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderCartItem;
