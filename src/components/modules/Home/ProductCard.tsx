/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hook";
import { addCart } from "@/redux/features/cart/CartSlice";
import { track } from "@/lib/gtm";

const ProductCard = ({ product }: any) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      addCart({
        id: product?._id,
        name: product?.name,
        price: product?.price,
        quantity: 1,
        image: product?.image,
      })
    );

    track("add_to_cart", {
      content_ids: [product?._id],
      content_type: "product",
      contents: [{ id: product?._id, item_price: product?.price }],
      value: product?.price,
      currency: "BDT",
    });

    toast.success("Product added to cart");
  };

  return (
    <div>
      <div className="group rounded-sm relative block overflow-hidden border border-muted">
        <Link className="relative" to={`/product/${product?.slug}`}>
          <img
            src={product?.image}
            alt={product?.name}
            className="h-40 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
          />
          {/* Off */}
          {product?.previousPrice > 0 && (
            <div className="text-xs sm:text-sm px-3 py-0.5 bg-primary absolute top-0 right-0 rounded-tr-sm rounded-bl-xs">
              {Math.round(
                (Number(product?.previousPrice - product?.price) /
                  Number(product?.previousPrice)) *
                  100
              )}
              % OFF
            </div>
          )}
        </Link>

        <div className="relative bg-background p-3 flex flex-col ">
          <Link to={`/product/${product?.slug}`} className="flex-1">
            <div className="text-center">
              <Badge
                variant="outline"
                className="text-xs rounded-full mx-auto w-max"
              >
                {product?.category}
              </Badge>
            </div>

            <h3 className="mt-2 text-sm sm:text-base font-semibold text-gray-900 text-center">
              {product?.name}
            </h3>

            <div className="flex gap-2 items-center justify-center">
              {product?.previousPrice > 0 && (
                <p className="mt-1.5 line-through text-xs sm:text-sm text-primary text-center">
                  Tk. {product?.previousPrice}
                </p>
              )}
              <p className="mt-1.5 text-sm sm:text-base  text-center">
                Tk. {product?.price}
              </p>
            </div>
          </Link>
          <Button
            onClick={handleAddToCart}
            className="mt-4 block text-center w-full rounded-sm bg-primary p-2 text-xs sm:text-sm font-medium transition hover:scale-103"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
