/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetProductQuery } from "@/redux/features/product/product.api";
import ProductCard from "./ProductCard";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/features/loadingSlice";
import { useEffect } from "react";
import ProductSkeleton from "./productSkeleton";

const ProductsSection = () => {
  const { data, isLoading } = useGetProductQuery(undefined) || [];
  const dispatch = useDispatch();
  const skeletonProducts: number[] = [1, 2, 3];

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  const products = data?.filter((product: any) => product?.status === "ACTIVE");

  return (
    <section className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {isLoading ? (
        <>
          {skeletonProducts?.map(() => (
            <ProductSkeleton />
          ))}
        </>
      ) : (
        <>
          {products?.map((product: any, idx: number) => (
            <ProductCard key={idx} product={product} />
          ))}
        </>
      )}

      {products?.map((product: any, idx: number) => (
        <ProductCard key={idx} product={product} />
      ))}
    </section>
  );
};

export default ProductsSection;
