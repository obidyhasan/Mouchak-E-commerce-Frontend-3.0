import { Skeleton } from "@/components/ui/skeleton";

const ProductSkeletonCard = () => {
  return (
    <div className="group rounded-sm relative block overflow-hidden border border-muted">
      <Skeleton className="h-40 sm:h-72 w-full rounded-sm" />

      <div className="bg-background p-3 flex flex-col gap-2">
        <Skeleton className="w-20 h-1.5 rounded-sm mx-auto" />
        <Skeleton className="h-2 w-full rounded-sm" />
        <Skeleton className="w-28 h-1.5 rounded-sm mx-auto" />
        <Skeleton className="h-4 w-full rounded-sm" />
      </div>
    </div>
  );
};

export default ProductSkeletonCard;
