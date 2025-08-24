/* eslint-disable @typescript-eslint/no-explicit-any */
const CheckoutItemCard = ({ item }: any) => {
  return (
    <div className="flex gap-3 items-center w-full border-b border-base-300 pb-2">
      <div className="w-full flex flex-col gap-1">
        <div className="flex items-center justify-between gap-1">
          <h1 className="text-base font-medium">{item?.name}</h1>
        </div>

        <div className=" flex items-center justify-between">
          <h1 className="text-sm">
            {item?.quantity} X {item?.price}
          </h1>
          <h2 className="">৳ {Number(item?.quantity) * Number(item?.price)}</h2>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItemCard;
