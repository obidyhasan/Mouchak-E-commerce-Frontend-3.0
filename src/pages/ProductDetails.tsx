/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductCard from "@/components/modules/Home/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/gtm";
import { setBuyNow } from "@/redux/features/buyNow/buyNowSlice";
import { addCart } from "@/redux/features/cart/CartSlice";
import { setLoading } from "@/redux/features/loadingSlice";
import {
  useGetProductQuery,
  useGetSingleProductQuery,
} from "@/redux/features/product/product.api";
import { useAppDispatch } from "@/redux/hook";
import { useEffect, useState } from "react";
import { FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const ProductDetails = () => {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: product, isLoading: singleProductLoading } =
    useGetSingleProductQuery(slug as string);

  const { data: allProducts, isLoading: allProductLoading } =
    useGetProductQuery(undefined) || [];

  useEffect(() => {
    dispatch(setLoading(singleProductLoading));
  }, [singleProductLoading, dispatch]);

  useEffect(() => {
    dispatch(setLoading(allProductLoading));
  }, [allProductLoading, dispatch]);

  useEffect(() => {
    track("view_item", {
      content_name: product?.name,
      content_ids: [product?._id],
      content_type: "product",
      contents: [{ id: product?._id, item_price: product?.price }],
      value: product?.price, // numeric
      currency: "BDT",
    });
  }, [product]);

  const products = allProducts?.filter(
    (product: any) => product.slug !== slug && product?.status === "ACTIVE"
  );

  const handleAddToCart = () => {
    dispatch(
      addCart({
        id: product?._id,
        name: product?.name,
        price: product?.price,
        quantity: quantity,
        image: product?.image,
      })
    );

    track("add_to_cart", {
      content_ids: [product?._id],
      content_type: "product",
      contents: [
        { id: product?._id, quantity: quantity, item_price: product?.price },
      ],
      value: product?.price,
      currency: "BDT",
    });

    toast.success("Product added to cart");
  };

  const handleBuyNow = () => {
    dispatch(
      setBuyNow({
        id: product?._id,
        name: product?.name,
        price: product?.price,
        quantity: quantity,
        image: product?.image,
      })
    );

    track("begin_checkout", {
      content_ids: [product?._id],
      contents: [
        { id: product?._id, quantity: quantity, item_price: product?.price },
      ],
      value: product?.price,
      currency: "BDT",
      num_items: 1,
    });

    navigate("/checkout", { state: "BuyNow" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 sm:py-10">
      <div className="flex gap-5 md:flex-row flex-col">
        <section className="w-full md:w-1/2">
          <figure>
            <img
              src={product?.image}
              alt={product?.name}
              className="w-full object-cover rounded-lg "
            />
          </figure>
        </section>
        <section className="w-full sm:w-1/2 space-y-2 sm:space-y-3">
          <div>
            <Badge
              variant="outline"
              className="text-xs rounded-full mx-auto w-max"
            >
              {product?.category}
            </Badge>
          </div>

          <h3 className="mt-2 text-lg sm:text-xl font-semibold text-gray-900 ">
            {product?.name}
          </h3>

          <p className="mt-1.5 text-base sm:text-lg font-semibold text-gray-700 ">
            Tk. {product?.price}
          </p>

          <div className="flex gap-4 flex-wrap">
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
                size={"sm"}
                variant={"outline"}
              >
                <FiPlus />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              variant={"outline"}
              onClick={handleAddToCart}
              className="text-center rounded-sm px-4 text-xs sm:text-sm font-medium transition hover:scale-103"
            >
              <FiShoppingCart /> Add to Cart
            </Button>
            <Button
              variant={"default"}
              onClick={handleBuyNow}
              className="text-center rounded-sm px-4 text-xs sm:text-sm font-medium transition hover:scale-103"
            >
              Buy Now
            </Button>
          </div>

          <div>
            <h1 className="font-medium text-lg border-b pb-2 mt-2">
              Description
            </h1>
            <p className="my-4 text-justify leading-relaxed">
              {product?.description}
            </p>
          </div>
        </section>
      </div>

      <div className="mt-16">
        <h1 className="text-lg font-semibold border-b pb-2">
          You may also like
        </h1>
        <section className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {products?.map((product: any, idx: number) => (
            <ProductCard key={idx} product={product} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default ProductDetails;
