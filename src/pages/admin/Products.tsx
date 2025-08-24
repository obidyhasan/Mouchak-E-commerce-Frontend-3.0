import AddProductDialog from "@/components/modules/Product/AddProductDialog";
import AllProductTable from "@/components/modules/Product/AllProductTable";
import { Button } from "@/components/ui/button";

const Products = () => {
  return (
    <div>
      <div className="w-full flex justify-between items-center gap-2">
        <h1 className="text-xl font-semibold">Products</h1>
        <AddProductDialog>
          <Button>Add Product</Button>
        </AddProductDialog>
      </div>
      <div className="my-10">
        <AllProductTable />
      </div>
    </div>
  );
};

export default Products;
