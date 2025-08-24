/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hook";
import { addCart } from "@/redux/features/cart/CartSlice";

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
    toast.success("Product added to cart");
  };

  return (
    <div>
      <div className="group rounded-sm relative block overflow-hidden">
        <Link to={`/product/${product?.slug}`}>
          <img
            src={product?.image}
            alt={product?.name}
            className="h-40 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
          />
        </Link>

        <div className="relative border border-gray-100 bg-background p-3 flex flex-col ">
          <Link to="/product-details" className="flex-1">
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

            <p className="mt-1.5 text-sm sm:text-base text-gray-700 text-center">
              Tk. {product?.price}
            </p>
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
