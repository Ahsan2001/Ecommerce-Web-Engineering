import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProductForm from "@/components/forms/ProductForm";
import { Product } from "@/data/dummyData";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product;
  onSubmit: (productData: Omit<Product, 'id' | 'createdAt' | 'reviews'>) => void;
}

export default function ProductDialog({ open, onOpenChange, product, onSubmit }: ProductDialogProps) {
  const handleSubmit = (productData: Omit<Product, 'id' | 'createdAt' | 'reviews'>) => {
    onSubmit(productData);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
        </DialogHeader>
        <ProductForm
          product={product}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}