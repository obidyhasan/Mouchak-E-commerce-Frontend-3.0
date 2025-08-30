import { Skeleton } from "@/components/ui/skeleton";

const ProductSkeleton = () => {
  <div className="flex flex-col space-y-3">
    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>;

  return (
    <div>
      <div className="group rounded-sm relative block overflow-hidden border border-muted">
        <Skeleton className="h-40 sm:h-72 w-full rounded-sm" />

        <div className="relative bg-background p-3 flex flex-col ">
          <Skeleton className="h-3 w-10 rounded-sm" />

          <Skeleton className="h-2 w-10 rounded-sm" />

          <Skeleton className="h-2 w-10 rounded-sm" />

          <Skeleton className="h-4 w-10 rounded-sm" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
