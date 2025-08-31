import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CategoryForm from "@/components/forms/CategoryForm";
import { Category } from "@/data/dummyData";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category;
  onSubmit: (categoryData: Omit<Category, 'id' | 'productCount'>) => void;
}

export default function CategoryDialog({ open, onOpenChange, category, onSubmit }: CategoryDialogProps) {
  const handleSubmit = (categoryData: Omit<Category, 'id' | 'productCount'>) => {
    onSubmit(categoryData);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {category ? 'Edit Category' : 'Add New Category'}
          </DialogTitle>
        </DialogHeader>
        <CategoryForm
          category={category}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}